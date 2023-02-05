/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import { toNewEvent} from '../utils/utils'
import middleware from '../utils/middleware'
import { getEvents, newEvent, getUpcoming } from '../services/eventServices'
//import { UpdateBoat } from '../types';
//import mongoose from 'mongoose';

const router = express.Router()

router.post('/', middleware.authorize, async (req, res) => {
  try{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEventEntry = toNewEvent(req.body, req.session.user)
    const event = await newEvent(newEventEntry)
    res.json(event)
} catch (error: unknown){
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage);
}
})

router.get('/', async (_req, res) => {
  const events = await getEvents()
  res.json(events)
})

router.get('/upcoming', middleware.authorize, async (req, res) => {
    if (req.session.user){
        const events = await getUpcoming(req.session.user)
        res.json(events)
    }
})

export default router