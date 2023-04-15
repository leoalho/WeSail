/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";
import { userJsonPatch } from "../services/userPatch";
import {
  getUsers,
  newUser,
  deleteUser,
  findUserId,
} from "../services/userServices";
import { toNewUser } from "../utils/utils";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  const users = await getUsers();
  res.json(users);
  next();
});

router.post("/", async (req, res, next) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newUserEntry = toNewUser(req.body);
    const user = await newUser(newUserEntry);
    res.json(user);
  } catch (error: unknown) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  const user = await findUserId(req.params.id);
  res.json(user);
});

router.patch("/:id", async (req, res, next) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await userJsonPatch(req.params.id, req.body.patch);
    const user = await findUserId(req.params.id);
    res.json(user);
  } catch (error: unknown) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await deleteUser(req.params.id);
    res.status(204).send("deleted user");
  } catch (error: unknown) {
    next(error);
  }
});

export default router;
