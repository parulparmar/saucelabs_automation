const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video : true,
  e2e: {
    baseUrl: 'https://www.saucedemo.com/',

    reporter: 'cypress-mochawesome-reporter',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
