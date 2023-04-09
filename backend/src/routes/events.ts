/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'

import { toNewEvent } from '../utils/utils'
import middleware from '../utils/middleware'
import { getEvents, newEvent, getUpcoming, getBoatEvents, updateEvent, getPastBoatEvents, deleteEvent } from '../services/eventServices'

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

router.patch('/:id', middleware.authorize, async (req, res) => {
  console.log(req.body.patch)
  try{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const updatedEvent = await updateEvent(req.session.user, req.params.id, req.body.patch)
    res.json(updatedEvent)
  } catch (error: unknown){
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
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

router.get('/boats/:id/past', async (req,res) => {
    const events = await getPastBoatEvents(req.params.id)
    res.json(events)
})

router.get('/boats/:id', async (req,res) => {
    const events = await getBoatEvents(req.params.id)
    res.json(events)
})

router.delete('/:id', async (req, res) => {
    try{
        await deleteEvent(req.params.id)
        res.status(204).send('deleted event')
    } catch (error: unknown){
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }

})

export default router