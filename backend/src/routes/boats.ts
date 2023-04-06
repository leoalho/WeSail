/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express';
import {toNewBoat} from '../utils/utils'
import middleware from '../utils/middleware';
import { getBoats, getBoat, newBoat, boatJsonPatch, deleteBoat } from '../services/boatServices';

const router = express.Router();

router.get('/', async (_req, res) => {
    const boats = await getBoats()
    res.json(boats)
})

router.get('/:id', async (req, res) => {
  const boat = await getBoat(req.params.id)
  res.json(boat)
})

router.post('/', middleware.authorize, async (req, res) => {
  try{
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const newBoatEntry = toNewBoat(req.body, req.session.user)
      const boat = await newBoat(newBoatEntry)
      res.json(boat)
  } catch (error: unknown){
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
      }
      res.status(400).send(errorMessage);
  }
})

router.patch('/:id', middleware.authorize, async (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await boatJsonPatch(req.session.user, req.params.id, req.body.patch)
    const boat = await getBoat(req.params.id)
    res.json(boat)
  })

router.delete('/:id', middleware.authorize, async (req, res) => {
  try{
    await deleteBoat(req.session.user, req.params.id)
    res.status(204).send('Deleted boat')
  } catch (error: unknown){
    let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res.status(400).send(errorMessage);
  }
})

export default router