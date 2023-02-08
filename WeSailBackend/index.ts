/* eslint-disable @typescript-eslint/no-floating-promises */

import { startServer } from './src/app'
import { connectDB } from './src/database'

const main = () => {
    connectDB()
    startServer()
}

main()