import express from 'express';

import { getUsers, newUser, deleteUser } from '../services/userServices';

import { toNewUser } from '../utils/utils';

const router = express.Router();

router.get('/', async (_req, res) => {
    const users = await getUsers()
    console.log(users)
    res.json(users)
  });

router.post('/', async (req, res) => {
    try{
        console.log(req.body)
        const {username, email, passwordHash} = req.body
        const newUserEntry = toNewUser({username, email, passwordHash})
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