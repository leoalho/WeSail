import express from 'express'
import session from 'express-session'

import userRoute from './routes/users'
import loginRoute from './routes/login'
import logoutRoute from './routes/logout'
import boatRoute from './routes/boats'
import eventRoute from './routes/events'
import logRoute from './routes/logs'
import config from './utils/config'
import { RedisStore, redisClient } from './redis'
//import redisClient from './redis'

//redisClient.connect().then(_result => console.log("connected to redis"))

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
if (process.env.NODE_ENV==='production') {app.use(express.static('frontend'))}
//app.use(cors)
app.use(express.static('images'))
app.use('/api/users', userRoute)
app.use('/api/login', loginRoute)
app.use('/api/logout', logoutRoute)
app.use('/api/boats', boatRoute)
app.use('/api/events', eventRoute)
app.use('/api/logs', logRoute)

export default app