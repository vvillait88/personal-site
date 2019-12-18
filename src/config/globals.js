const result = require('dotenv').config();

let envs;

if (result && result.parsed) {
  const keys = Object.keys(result.parsed);

  envs = {};

  keys.forEach((x) => {
    envs[x] = JSON.stringify(result.parsed[x]);
  });
} else {
  require('dotenv').config();

  envs = {
    NODE_ENV : JSON.stringify(process.env.NODE_ENV),
    WEBPACK  : JSON.stringify(process.env.WEBPACK),

    UI_URL         : JSON.stringify(process.env.UI_URL),
    API_URL        : JSON.stringify(process.env.API_URL),
    APP_API_KEY    : JSON.stringify(process.env.APP_API_KEY),
    APP_API_SECRET : JSON.stringify(process.env.APP_API_SECRET),
  };
}

module.exports = envs;
