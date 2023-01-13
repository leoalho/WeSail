import express from 'express'
import mongoose from 'mongoose'

import config from './src/utils/config'
import logger from './src/utils/logger'
import userRoute from './src/routes/users'
import loginRoute from './src/routes/login'

const app = express();
app.use(express.json());
app.use('/api/users', userRoute)
app.use('/api/login', loginRoute)

if (config.MONGODB_URI){
    logger.info('connecting to', config.MONGODB_URI)

    mongoose.connect(config.MONGODB_URI)
      .then(() => {
        logger.info('connected to MongoDB')
      })
      .catch((error) => {
        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message
        logger.error('error connection to MongoDB:', message)
      })
} else {
    logger.error('No database URI given')
}

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});