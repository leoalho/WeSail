import express from 'express'

const logoutRouter = express.Router()

logoutRouter.get('/', async (req, res) => {
  req.session.destroy((e) => {
    console.log(e)
  })
  res.status(200).end()
})

export default logoutRouter