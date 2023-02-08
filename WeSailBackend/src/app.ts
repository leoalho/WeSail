import connect_redis from 'connect-redis'
import { createClient } from 'redis'
import express from 'express'
import session from 'express-session'

import logger from './/utils/logger'
import userRoute from './routes/users'
import loginRoute from './routes/login'
import logoutRoute from './routes/logout'
import boatRoute from './routes/boats'
import eventRoute from './routes/events'
import logRoute from './routes/logs'
import config from './utils/config'
import { connectDB } from './database'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
connectDB()

const RedisStore = connect_redis(session)
const redisClient = createClient({ legacyMode: true })

redisClient.connect().then(() => {
    logger.info("Connected to Redis")}).catch(console.error)

const app = express();
app.disable('x-powered-by');
app.use(
    session({
    // @ts-expect-error because wrong type definitions of connect-redis
    // See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/58915 for more info
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
app.use('/api/events', eventRoute)
app.use('/api/logs', logRoute)

export default app