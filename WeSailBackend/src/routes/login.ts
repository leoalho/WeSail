import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import express from 'express'
import { findUser } from '../services/userServices'
//import { parseString } from '../utils/utils'
import config from '../utils/config'

const loginRouter = express.Router()

loginRouter.post('/', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const user = await findUser(username)
    if (!user){
        res.status(401).json({ error: 'Incorrect username' })
        return
    }
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash)
    if (!passwordCorrect){
        res.status(401).json({ error: 'Incorrect password' })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
      }

    const token = jwt.sign(userForToken, config.SECRET)

    res
      .status(200)
      .send({ token, username: user.username })

})

export default loginRouter