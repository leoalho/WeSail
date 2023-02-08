import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import { closeInstance } from '../app'

const api = supertest(app)

test('users are returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(async () => {
  await mongoose.connection.close()
  closeInstance()
})