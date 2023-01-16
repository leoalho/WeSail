import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import connect_redis from 'connect-redis'
import { createClient } from 'redis'
//import cors from 'cors'

import logger from './src/utils/logger'
import userRoute from './src/routes/users'
import loginRoute from './src/routes/login'
import logoutRoute from './src/routes/logout'
import boatRoute from './src/routes/boats'
import config from './src/utils/config'

let RedisStore = connect_redis(session)
let redisClient = createClient({ legacyMode: true })

redisClient.connect().then(() => {
  console.log("Connected to Redis")}).catch(console.error)

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

const app = express();
app.disable('x-powered-by');
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    secret: config.SECRET,
    resave: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 365
  } 
  })
)
app.use(express.json());
//app.use(express.static('../wesailfrontend/build'))
//app.use(cors)
app.use('/api/users', userRoute)
app.use('/api/login', loginRoute)
app.use('/api/logout', logoutRoute)
app.use('/api/boats', boatRoute)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});