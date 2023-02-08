import session from 'express-session'
import connect_redis from 'connect-redis'
import { createClient } from 'redis'
import logger from './utils/logger'
//import logger from './utils/logger'
//import redisMock from 'redis-mock'

const redisClient = createClient({ legacyMode: true})

redisClient.connect().then(() => {
  logger.info("Connected to Redis")}).catch(console.error)

const RedisStore = connect_redis(session)

export {RedisStore, redisClient}