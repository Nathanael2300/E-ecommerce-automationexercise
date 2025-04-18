const { defineConfig } = require("cypress");

module.exports = defineConfig({

  env: {
    USER_EMAIL: "testUser123321@gmail.com",
    USER_PASSWORD: "userpass123456789"
  },

  e2e: {
    baseUrl: 'https://www.automationexercise.com'
  },
});
