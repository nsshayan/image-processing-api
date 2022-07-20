import { promises as fs } from 'fs';
import path from 'path';
import process from './process-image';

interface Query {
  filename?: string;
  width?: string;
  height?: string;
}

export default class Image {
  static fullPath = path.resolve(__dirname, '../../images/full');
  static thumbPath = path.resolve(__dirname, '../../images/thumb');

  static async getImagePath(params: Query): Promise<null | string> {
    if (!params.filename) {
      return null;
    }

    const filePath: string =
      params.width && params.height
        ? path.resolve(
            Image.thumbPath,
            `${params.filename}-${params.width}x${params.height}.jpg`
          )
        : path.resolve(Image.fullPath, `${params.filename}.jpg`);

    try {
      await fs.access(filePath);
      return filePath;
    } catch {
      return null;
    }
  }

  static async isImageAvailable(filename: string = ''): Promise<boolean> {
    if (!filename) {
      return false;
    }

    return (await Image.getAvailableImageNames()).includes(filename);
  }

  static async getAvailableImageNames(): Promise<string[]> {
    try {
      return (await fs.readdir(Image.fullPath)).map(
        (filename: string): string => filename.split('.')[0]
      );
    } catch {
      return [];
    }
  }

  static async isThumbAvailable(params: Query): Promise<boolean> {
    if (!params.filename || !params.width || !params.height) {
      return false;
    }

    const filePath: string = path.resolve(
      Image.thumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );

    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  static async createThumbPath(): Promise<void> {
    try {
      await fs.access(Image.thumbPath);
    } catch {
      fs.mkdir(Image.thumbPath);
    }
  }

  static async createThumb(params: Query): Promise<null | string> {
    if (!params.filename || !params.width || !params.height) {
      return null;
    }

    const filePathFull: string = path.resolve(
      Image.fullPath,
      `${params.filename}.jpg`
    );
    const filePathThumb: string = path.resolve(
      Image.thumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );

    console.log(`Creating thumb ${filePathThumb}`);

    return await process({
      source: filePathFull,
      target: filePathThumb,
      width: parseInt(params.width),
      height: parseInt(params.height)
    });
  }
}
