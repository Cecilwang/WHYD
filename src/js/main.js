require('dotenv').config();

var getCapabilities = require('./capabilities/capabilities.js');

window.TrelloPowerUp.initialize(
    getCapabilities(),
    {appKey: process.env.APP_KEY, appName: process.env.APP_NAME});
