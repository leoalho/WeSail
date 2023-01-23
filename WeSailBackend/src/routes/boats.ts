/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express';
import {toNewBoat} from '../utils/utils'
import middleware from '../utils/middleware';
import { getBoats, newBoat } from '../services/boatServices';

const router = express.Router();

router.get('/', async (_req, res) => {
    const boats = await getBoats()
    res.json(boats)
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

export default router