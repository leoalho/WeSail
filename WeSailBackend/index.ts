import express from 'express';

import {config} from './utils/config';
import logger from './utils/logger';

const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});