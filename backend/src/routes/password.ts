/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";
import { forgottenPassword, renewPassword } from "../services/userServices";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await forgottenPassword(req.body.username);
    res.status(200).end();
  } catch (error: unknown) {
    next(error);
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await renewPassword(req.params.id, req.body.password);
    res.status(200).end();
  } catch (error: unknown) {
    next(error);
  }
});

export default router;
