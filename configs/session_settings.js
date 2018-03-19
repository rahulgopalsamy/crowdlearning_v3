'use strict';

    const sessionSettings = {
        store: {
            url: 'mongodb://test:test@ds159662.mlab.com:59662/crowdlearning',
            ttl: 7 * 24 * 60 * 60
            //saves under default 'session' collections in the database
        },
        secret: "msd1320!hh",
        saveUinitialized: true,
        resave: false,
        cookie: {
            path: "/",
            maxAge: 18000000,
            httpOnly: true
        },
        name: "id"
    };

module.exports = sessionSettings;
