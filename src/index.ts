import express from 'express';
import routes from '../src/routes/root-middleware';
import Image from './utilities/image';

const app: express.Application = express();
const port: number = 3000; // Default port

app.use(routes);

app.listen(port, async (): Promise<void> => {
  await Image.createThumbPath();

  const url: string = `\x1b[2mhttp://localhost:${port}\x1b[0m`;
  console.log(`Open ${url} ..`);
});

export default app;
