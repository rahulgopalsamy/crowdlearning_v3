'use strict';

const express = require('express');

let router = express.Router();

router.get('/', function(req, res){
    res.render('pages/login');
});

module.exports = router;
