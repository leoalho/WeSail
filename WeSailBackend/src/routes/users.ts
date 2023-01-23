/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'

import { getUsers, newUser, deleteUser, updateUser } from '../services/userServices'
import mongoose from 'mongoose'
import { toNewUser, parseString, parseObjectId } from '../utils/utils'
import { UpdateUser } from '../types'

const router = express.Router();

router.get('/', async (_req, res, next) => {
    const users = await getUsers()
    res.json(users)
    next()
});

router.post('/', async (req, res) => {
    try{
        console.log(req.body)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newUserEntry = toNewUser(req.body)
        const user = await newUser(newUserEntry)
        res.json(user)
    } catch (error: unknown){
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
})

router.put('/:id', async (req, res) => {
  
    const user:  UpdateUser = {
      username: parseString(req.body.content),
      passwordHash: parseString(req.body.important),
      email: parseString(req.body.email),
      friend: parseObjectId(req.body.friend),
      status: parseString(req.body.status)
    }
    
    console.log(user)
    const userId = new mongoose.Types.ObjectId(req.params.id)
    const updatedUser = await updateUser(userId, user)

    res.json(updatedUser)
})

router.delete('/:id', async (req, res) => {
    try{
        await deleteUser(req.params.id)
        res.status(204).send('deleted user')
    } catch (error: unknown){
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
    
})

export default router;