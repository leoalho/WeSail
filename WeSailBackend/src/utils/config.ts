import * as dotenv from 'dotenv'
dotenv.config()

const PORT: string = process.env.PORT || '3001'
const MONGODB_URI: string | undefined = process.env.MONGODB_URI
const REDIS_URI: string | undefined = process.env.REDIS_URI
const SECRET: string = process.env.SECRET || 'secret'
const SALTROUNDS = 11

export default {MONGODB_URI, PORT, SECRET, SALTROUNDS, REDIS_URI}