import config from './utils/config'
import logger from './utils/logger'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

export const connectDB = async () => {
    let dbUrl = config.MONGODB_URI

    if (process.env.NODE_ENV === 'test') {
        const mongod = await MongoMemoryServer.create();
        dbUrl = mongod.getUri();
    }
    
    if (dbUrl){
        logger.info('connecting to', config.MONGODB_URI)
        try{
            await mongoose.connect(dbUrl)
            logger.info('connected to MongoDB')
        }catch (error) {
            let message = 'Unknown Error'
            if (error instanceof Error) message = error.message
            logger.error('error connection to MongoDB:', message)
        }
    } else {
        logger.error('No database URI given')
    }
    
}