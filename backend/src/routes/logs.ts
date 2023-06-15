/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";

import middleware from "../utils/middleware";
import {
  getBoatLogs,
  getLogs,
  getMainLogs,
  getSingleLog,
  getUserLogs,
  newLog,
} from "../services/logServices";
import { toNewLog } from "../utils/utils";

const router = express.Router();

router.get("/", middleware.authorize, async (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const logs = await getLogs();
  res.json(logs);
});

router.get("/main", middleware.authorize, async (req, res) => {
  if (req.session.user) {
    const logs = await getMainLogs(req.session.user);
    res.json(logs);
  }
});

router.get("/boats/:id", async (req, res) => {
  const logs = await getBoatLogs(req.params.id);
  res.json(logs);
});

router.get("/users/:id", async (req, res) => {
  const logs = await getUserLogs(req.params.id);
  res.json(logs);
});

router.get("/:id", middleware.authorize, async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const log = await getSingleLog(req.params.id);
  res.json(log);
});

router.post("/", middleware.authorize, async (req, res, next) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEventEntry = toNewLog(req.body, req.session.user);
    const event = await newLog(newEventEntry);
    res.json(event);
  } catch (error: unknown) {
    next(error);
  }
});

export default router;
