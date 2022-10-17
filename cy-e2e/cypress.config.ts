import { defineConfig } from "cypress";
import { baseUrl, cypressFolder, defaultWaitingTime } from "./cypress/support/constants/constants";
import AllureWriter from "@shelex/cypress-allure-plugin/writer";

export default defineConfig({
  e2e: {
    specPattern: `${cypressFolder}/e2e/**/*.cy.ts`,
    baseUrl,
    defaultCommandTimeout: defaultWaitingTime * 5,
    supportFile: `${cypressFolder}/support/index.ts`,
    videosFolder: `${cypressFolder}/assets/videos`,
    downloadsFolder: `${cypressFolder}/assets/downloads`,
    screenshotsFolder: `${cypressFolder}/assets/screenshots`,
    fixturesFolder: `${cypressFolder}/fixtures`,
    setupNodeEvents(on, config) {
      AllureWriter(on, config);
      return config;
    },
    env: {
      allure: true,
      allureResultsPath: `${cypressFolder}/assets/allure-results`
    },
    viewportWidth: 1366,
    viewportHeight: 768
  }
});
