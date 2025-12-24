import express from 'express';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { getEnvVar } from './utils/getEnvVar.js';
import router from './routers/contacts.js';
import cors from 'cors';
import pino from 'pino-http';

const PORT = Number(getEnvVar('PORT', '9090'));

export const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(
    pino({
      trasport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(router);

  app.use(notFoundHandler);

  app.listen(PORT, () => {
    console.log(`Server on port ${PORT} is running!`);
  });
};
