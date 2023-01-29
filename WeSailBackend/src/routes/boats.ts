/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express';
import {parseObjectId, toNewBoat} from '../utils/utils'
import middleware from '../utils/middleware';
import { getBoats, getBoat, newBoat, updateBoat, deleteFollower } from '../services/boatServices';
import { UpdateBoat } from '../types';
import mongoose from 'mongoose';

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

router.patch('/:id', async (req, res) => {
  const boat: UpdateBoat = {}
  if (req.body.follower) {
    boat.follower = parseObjectId(req.body.follower)
  }
  const boatId = new mongoose.Types.ObjectId(req.params.id)
  const updatedBoat = await updateBoat(boatId, boat)
  res.json(updatedBoat)
})

router.delete('/:id/followers/:follower', async (req,res) => {
  await deleteFollower(req.params.id, req.params.follower)
  res.status(204).send('deleted follower')
})

export default router