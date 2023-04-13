import {defineConfig} from 'cypress'
import init from './mongo/teardown'

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on){
      on('task', {
        'init:db': async () => {
          await init()
          return null
        }
      })
    },
    baseUrl: 'http://localhost:3000',
  },
})