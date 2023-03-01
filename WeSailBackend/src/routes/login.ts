/* eslint-disable @typescript-eslint/no-misused-promises */
//import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import express from 'express'
import { findUser, findUserId } from '../services/userServices'
import { parseString } from '../utils/utils'
//import config from '../utils/config'

declare module "express-session" {
  interface SessionData {
    user: string
  }
}

const loginRouter = express.Router()

loginRouter.get('/', async (req, res) => {
  if (req.session.user){
    const user = await findUserId(req.session.user)
    if (user){
      res.json(user)
      return 
    }
  }else{
  res.status(401).json({ error: 'You are not logged in' })
  return
  }
})

loginRouter.post('/', async (req, res) => {
    const username = parseString(req.body.username)
    const password = parseString(req.body.password)
    const user = await findUser(username)
    if (!user){
        res.status(401).json({ error: 'Incorrect username' })
        return
    }
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash)
    if (!passwordCorrect){
        res.status(401).json({ error: 'Incorrect password' })
        return
    }
    req.session.user = user._id.toString();

    res
      .status(200).json(user)

})

export default loginRouter