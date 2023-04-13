require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI
const client = new MongoClient(url)
const db = client.db('the_database')

const connectDB = async () => {
  console.log(`Connecting to db ${process.env.MONGODB_URI}`)
  await client.connect()
  console.log('connected to db') 
}

const deleteCollections = async () => {
  const collections = await db.collections()
  for (let i = 0; i < collections.length; i++){
    var collection = collections[i]
    await collection.drop()
    console.log(`Dropped collection ${collection.collectionName}`)
  }
}

const initialize = async () => {
  await db.collection('users').insertOne({ username: 'test', passwordHash: '$2a$10$Pb9o5b/WB7FuQ5BPHrGd6eqgLw.4B.CuOBkd.L8kc.awJhbWKQi0G',  email: 'leo.leo@leo.leo' })
  console.log('initialized database with test user')
}

export default async () => {
  await connectDB()
  await deleteCollections()
  await initialize()
  await client.close()
}