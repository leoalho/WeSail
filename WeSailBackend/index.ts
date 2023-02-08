/* eslint-disable @typescript-eslint/no-floating-promises */

import app from "./src/app";
import config from "./src/utils/config";
import logger from "./src/utils/logger";

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
});
