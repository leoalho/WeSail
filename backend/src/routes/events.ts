/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import express from "express";

import { toNewEvent } from "../utils/utils";
import middleware from "../utils/middleware";
import {
  getEvents,
  newEvent,
  getUpcoming,
  getBoatEvents,
  updateEvent,
  getPastBoatEvents,
  deleteEvent,
} from "../services/eventServices";

const router = express.Router();

router.post("/", middleware.authorize, async (req, res, next) => {
  try {
    const newEventEntry = toNewEvent(req.body, req.session.user);
    const event = await newEvent(newEventEntry);
    res.json(event);
  } catch (error: unknown) {
    next(error);
  }
});

router.patch("/:id", middleware.authorize, async (req, res, next) => {
  try {
    const updatedEvent = await updateEvent(
      req.session.user,
      req.params.id,
      req.body.patch
    );
    res.json(updatedEvent);
  } catch (error: unknown) {
    next(error);
  }
});

router.get("/", async (_req, res) => {
  const events = await getEvents();
  res.json(events);
});

router.get("/upcoming", middleware.authorize, async (req, res) => {
  if (req.session.user) {
    const events = await getUpcoming(req.session.user);
    res.json(events);
  }
});

router.get("/boats/:id/past", async (req, res) => {
  const events = await getPastBoatEvents(req.params.id);
  res.json(events);
});

router.get("/boats/:id", async (req, res) => {
  const events = await getBoatEvents(req.params.id);
  res.json(events);
});

router.delete("/:id", async (req, res, next) => {
  try {
    await deleteEvent(req.session.user, req.params.id);
    res.status(204).send("deleted event");
  } catch (error: unknown) {
    next(error);
  }
});

export default router;
