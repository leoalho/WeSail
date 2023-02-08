import type {Config} from "@jest/types"

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true
}

export default config

//   setupFilesAfterEnv: ['./jest.setup.redis-mock.js'],