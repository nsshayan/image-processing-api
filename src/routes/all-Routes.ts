import express from 'express';
import Image from '../utilities/image';

interface Query {
  filename?: string;
  width?: string;
  height?: string;
}

const validate = async (query: Query): Promise<null | string> => {
  if (!(await Image.isImageAvailable(query.filename))) {
    const availableImageNames: string = (
      await Image.getAvailableImageNames()
    ).join(', ');
    return `Please pass a valid filename in the 'filename' query segment. Available filenames are: ${availableImageNames}.`;
  }

  if (!query.width && !query.height) {
    return null;
  }

  const width: number = parseInt(query.width || '');
  if (Number.isNaN(width) || width < 1) {
    return "Please provide a positive numerical value for the 'width' query segment.";
  }

  const height: number = parseInt(query.height || '');
  if (Number.isNaN(height) || height < 1) {
    return "Please provide a positive numerical value for the 'height' query segment.";
  }
  return null;
};

const imageRoutes: express.Router = express.Router();

imageRoutes.get(
  '/',
  async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    const validationMessage: null | string = await validate(request.query);
    if (validationMessage) {
      response.send(validationMessage);
      return;
    }

    let error: null | string = '';

    if (!(await Image.isThumbAvailable(request.query))) {
      error = await Image.createThumb(request.query);
    }

    if (error) {
      response.send(error);
      return;
    }

    const path: null | string = await Image.getImagePath(request.query);
    if (path) {
      response.sendFile(path);
    } else {
      response.send('This should not have happened.');
    }
  }
);

export default imageRoutes;
