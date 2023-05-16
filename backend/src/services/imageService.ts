import sharp from "sharp";

import { checkOWner, profileTrue } from "./boatServices";

export const saveFile = async (
  file: Express.Multer.File,
  user: string | undefined,
  id: string
) => {
  if (user && (await checkOWner(id, user))) {
    await sharp(file.buffer)
      .resize({ width: 250, height: 250 })
      .jpeg()
      .toFile(`images/boat_profile_images/${id}.jpeg`);
    await profileTrue(id);
  }
};
