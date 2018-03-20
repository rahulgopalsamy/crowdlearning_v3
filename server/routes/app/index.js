'use strict';
//routes starting with user/ e.g., /user/login

const express = require('express'),
        passport = require('passport'),
        user = require('../../controller/user/user');

let router = express.Router();

router.post('/login', passport.authenticate('local-login'), user.login);


router.post('/register', passport.authenticate('local'), user.register);


module.exports = router;
