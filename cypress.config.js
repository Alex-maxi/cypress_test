const { defineConfig } = require("cypress");
const axios = require('axios');

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: false,
  env: {
    baseUrl: "http://localhost:8080/#"
  },
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        async createUserIfNotExists({ email, password }) {
          try {
            const baseUrl = config.env.baseUrl.replace(/#$/, '');
            const apiUrl = `${baseUrl}/api/Users`;
            await axios.post(apiUrl, {
              email,
              password,
              passwordRepeat: password,
              securityQuestion: {
                id: 1,
                question: "Mother's maiden name?",
                createdAt: new Date(),
                updatedAt: new Date()
              },
              securityAnswer: 'qwert'
            });
            console.log(`User created: ${email}`);
            return true;
          } catch (err) {
            if (err.response && err.response.status === 400) {
              console.log(`User already exists: ${email}`);
              return true;
            }
            console.error(err);
            throw err;
          }
        },
      });

      return config;
    },
  },
});
