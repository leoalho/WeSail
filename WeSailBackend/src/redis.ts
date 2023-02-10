import session from 'express-session'
import connect_redis from 'connect-redis'
import { createClient } from 'redis'
//import logger from './utils/logger'

export type RedisClientType = ReturnType<typeof createClient>;

/*
class RedisClient {
  Client: (null | RedisClientType)
  constructor() {
    this.Client = null;
  }

  async connect() {
    this.Client = createClient({ legacyMode: true});
    await this.Client.connect();
    return this.Client;
  }

  async disconnect() {
    if (this.Client){
      await this.Client.quit()
    }
  }
}
*/

const redisClient = createClient({ legacyMode: true})

/*
console.log(redisClient)
redisClient.connect().then(() => {
  logger.info("Connected to Redis")}).catch(console.error)
*/

const RedisStore = connect_redis(session)

//export default new RedisClient()
export {RedisStore, redisClient}