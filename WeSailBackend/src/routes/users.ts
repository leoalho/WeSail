/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'

import { getUsers, newUser, deleteUser, updateUser, findUserId, deleteFriend } from '../services/userServices'
import mongoose from 'mongoose'
import { toNewUser, parseObjectId } from '../utils/utils'
import { UpdateUser } from '../types'

const router = express.Router();

router.get('/', async (_req, res, next) => {
    const users = await getUsers()
    res.json(users)
    next()
});

router.post('/', async (req, res) => {
    try{
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

router.get('/:id', async (req, res) => {
  const user = await findUserId(req.params.id)
  res.json(user)
})

router.delete('/:id/friends/:friend', async (req, res) => {
  await deleteFriend(req.params.id, req.params.friend)
  res.status(204).send('deleted friend')
})

router.patch('/:id', async (req, res) => {
    console.log(req.body)
    const user:  UpdateUser = {}
    if (req.body.friend) { user.friend = parseObjectId(req.body.friend) }
    if (req.body.friendRequest) { user.friendRequest = parseObjectId(req.body.friendRequest) }
      //username: parseString(req.body.content),
      //passwordHash: parseString(req.body.important),
      //email: parseString(req.body.email),
      //status: parseString(req.body.status)
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