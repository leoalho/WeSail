/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express';

import { getBoats } from '../services/boatServices';

const router = express.Router();

router.get('/', async (_req, res) => {
    const boats = await getBoats()
    res.json(boats)
})

export default router