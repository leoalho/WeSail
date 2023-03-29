/* eslint-disable @typescript-eslint/no-floating-promises */

import app from "./src/app";
import config from "./src/utils/config";
import logger from "./src/utils/logger";
import {redisClient} from "./src/redis";
import { connectDB } from "./src/database";

// eslint-disable-next-line @typescript-eslint/no-floating-promises
connectDB()

redisClient.connect().then(() => {logger.info("Connected to Redis")}).catch(console.error)

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
});
