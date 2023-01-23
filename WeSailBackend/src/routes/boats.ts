/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express';
import {toNewBoat} from '../utils/utils'
import { getBoats, newBoat } from '../services/boatServices';

const router = express.Router();

router.get('/', async (_req, res) => {
    const boats = await getBoats()
    res.json(boats)
})

router.post('/', async (req, res) => {
  try{
      console.log(req.body)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const newUserEntry = toNewBoat(req.body)
      const user = await newBoat(newUserEntry)
      res.json(user)
  } catch (error: unknown){
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
      }
      res.status(400).send(errorMessage);
  }
})

export default router