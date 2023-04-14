import express from 'express'
import session from './session'

import userRoute from './routes/users'
import loginRoute from './routes/login'
import logoutRoute from './routes/logout'
import boatRoute from './routes/boats'
import eventRoute from './routes/events'
import logRoute from './routes/logs'
import middleware from './utils/middleware'

const app = express()

app.disable('x-powered-by')
app.use(session)
app.use(express.json())
app.use('/images', express.static('images'))
app.use('/api/users', userRoute)
app.use('/api/login', loginRoute)
app.use('/api/logout', logoutRoute)
app.use('/api/boats', boatRoute)
app.use('/api/events', eventRoute)
app.use('/api/logs', logRoute)
app.use(middleware.errorHandler)

export default app