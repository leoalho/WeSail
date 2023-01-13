import * as dotenv from 'dotenv'
dotenv.config()

const PORT: string = process.env.PORT || '3001'
const MONGODB_URI: string | undefined = process.env.MONGODB_URI
const SECRET: string = process.env.SECRET || 'secret'

export default {MONGODB_URI, PORT, SECRET}