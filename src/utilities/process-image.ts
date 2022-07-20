import sharp from 'sharp';

interface sharpResizeParams {
  source: string;
  target: string;
  width: number;
  height: number;
}

const process = async (params: sharpResizeParams): Promise<null | string> => {
  try {
    await sharp(params.source)
      .resize(params.width, params.height)
      .toFormat('jpeg')
      .toFile(params.target);
    return null;
  } catch {
    return 'Image cant be processed.';
  }
};

export default process;
