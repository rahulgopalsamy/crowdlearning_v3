'use strict';

let session = require('./session_settings');

const config = {
    env: 'local',
    port: '3000',
    hostname: 'localhost',
    viewDir: './app/views',
    mongo : 'mongodb://test:test@ds159662.mlab.com:59662/crowdlearning',
    public_path : './public',
    sessionSetting : session
};


module.exports = config;
