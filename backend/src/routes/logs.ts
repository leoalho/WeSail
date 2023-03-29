/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express';
//import { toNewLog} from '../utils/utils'
import middleware from '../utils/middleware';
import { getBoatLogs, getLogs, getMainLogs, getUserLogs, newLog } from '../services/logServices';
import { toNewLog } from '../utils/utils';

const router = express.Router()

router.get('/', middleware.authorize, async (_req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const logs = await getLogs()
    res.json(logs)
})

router.get('/main', middleware.authorize, async (req, res) => {
    if (req.session.user){
        const logs = await getMainLogs(req.session.user)
        res.json(logs)
    }
})

router.get('/boats/:id', async (req,res) => {
    const logs = await getBoatLogs(req.params.id)
    res.json(logs)
})

router.get('/users/:id', async (req,res) => {
    const logs = await getUserLogs(req.params.id)
    res.json(logs)
})

router.post('/', middleware.authorize, async (req, res) => {
    try{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newEventEntry = toNewLog(req.body, req.session.user)
        const event = await newLog(newEventEntry)
        res.json(event)
    } catch (error: unknown){
        let errorMessage = 'Something went wrong.'
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message
        }
        res.status(400).send(errorMessage);
    }
})

export default router