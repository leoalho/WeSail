import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import User from '../models/user'
import { connectDB } from '../database'
import {redisClient } from '../redis'
import { user1, user2 } from './data'

const api = supertest(app)
const agent = supertest.agent(app)

beforeAll(async () => {
  await connectDB()
  await redisClient.connect()
})

beforeEach(async () => {
  await User.deleteMany({})
  await api.post('/api/users').send(user1)
})

test('users are returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Creating a user returned as json', async () => {
  await api
    .post('/api/users')
    .send(user2)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Creating a user appends the number of returned users by one', async () => {
  await api.post('/api/users').send(user2)

  const response = await api.get('/api/users')

  expect(response.body).toHaveLength(2)
})

test('Logging in returns json and correct status code', async () => {
  await api
  .post('/api/login')
  .send(user1)
  .expect(200)
  .expect('Content-Type', /application\/json/)
})

test('The app remembers logged in users', async () => {
  await agent.post('/api/login').send(user1)
  const response = await agent
    .get('/api/login')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body.username).toBe('Testi')
})

test('The app forgets logged out users', async () => {
  await agent.post('/api/login').send(user1)
  await agent.get('/api/login').expect(200)
  await agent.get('/api/logout').expect(200)
  await agent.get('/api/login').expect(401)
})

afterAll(async () => {
  await mongoose.connection.close()
  await redisClient.quit()
})