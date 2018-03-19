'use strict';

const express = require('express');

let router = express.Router();

router.get('/', function(req, res){
    res.send("This is instructor");
})

module.exports = router;
