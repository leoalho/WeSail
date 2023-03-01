import session from 'express-session'
import connect_redis from 'connect-redis'
import { createClient } from 'redis'
import config from './utils/config'

export type RedisClientType = ReturnType<typeof createClient>;

const redisClient = createClient({ legacyMode: true, url: config.REDIS_URI})

const RedisStore = connect_redis(session)

//export default new RedisClient()
export {RedisStore, redisClient}