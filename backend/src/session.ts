import session from 'express-session'
import { RedisStore, redisClient } from './redis'
import config from './utils/config'

export default session({
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