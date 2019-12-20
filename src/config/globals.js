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
  };
}

module.exports = envs;
