import { promises as fs } from 'fs';
import path from 'path';
import Image from '../utilities/image';

describe('Test  processing via sharp', (): void => {
  it('raises invalid width value error', async (): Promise<void> => {
    const error: null | string = await Image.createThumb({
      filename: 'foo',
      width: '-100',
      height: '500'
    });
    expect(error).not.toBeNull();
  });

  it('raises filename does not exist error', async (): Promise<void> => {
    const error: null | string = await Image.createThumb({
      filename: 'foo',
      width: '100',
      height: '500'
    });
    expect(error).not.toBeNull();
  });

  it('writes a thumb file', async (): Promise<void> => {
    await Image.createThumb({ filename: 'fjord', width: '99', height: '99' });

    const resizedImagePath: string = path.resolve(
      Image.thumbPath,
      `fjord-99x99.jpg`
    );
    let errorFile: null | string = '';

    try {
      await fs.access(resizedImagePath);
      errorFile = null;
    } catch {
      errorFile = 'File was not created';
    }

    expect(errorFile).toBeNull();
  });
});

afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    Image.thumbPath,
    'fjord-99x99.jpg'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    console.log('Exception Occured');
  }
});
