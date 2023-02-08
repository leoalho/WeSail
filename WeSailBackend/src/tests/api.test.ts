import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import { connectDB } from '../database'
import client from '../redis'
const api = supertest(app)

beforeAll(async () => {
  await connectDB()
  await client.connect()
})

test('users are returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(async () => {
  await mongoose.connection.close()
})