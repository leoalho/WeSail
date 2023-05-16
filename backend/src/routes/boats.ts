/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";
import { toNewBoat } from "../utils/utils";
import middleware from "../utils/middleware";
import {
  getBoats,
  getBoat,
  newBoat,
  boatJsonPatch,
  deleteBoat,
} from "../services/boatServices";

import multer from "multer";
import { saveFile } from "../services/imageService";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", async (_req, res) => {
  const boats = await getBoats();
  res.json(boats);
});

router.get("/:id", async (req, res, next) => {
  try {
    const boat = await getBoat(req.params.id);
    res.json(boat);
  } catch (error: unknown) {
    next(error);
  }
});

router.post("/", middleware.authorize, async (req, res, next) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newBoatEntry = toNewBoat(req.body, req.session.user);
    const boat = await newBoat(newBoatEntry);
    res.json(boat);
  } catch (error: unknown) {
    next(error);
  }
});

router.patch("/:id", middleware.authorize, async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  await boatJsonPatch(req.session.user, req.params.id, req.body.patch);
  const boat = await getBoat(req.params.id);
  res.json(boat);
});

router.post(
  "/:id/profile",
  middleware.authorize,
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      if (req.file) {
        await saveFile(req.file, req.session.user, req.params.id);
        res.status(201).send("Image uploaded succesfully");
      } else {
        res.status(204).send("Something went wrong");
      }
    } catch (error: unknown) {
      next(error);
    }
  }
);

router.delete("/:id", middleware.authorize, async (req, res, next) => {
  try {
    await deleteBoat(req.session.user, req.params.id);
    res.status(204).send("Deleted boat");
  } catch (error: unknown) {
    next(error);
  }
});

export default router;
