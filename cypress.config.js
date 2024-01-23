import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(output) {
          console.log(output)
          return null
        }
      })
    },
  },
  defaultCommandTimeout: 10000,
  screenshotOnRunFailure: false,
  watchForFileChanges: false
});
