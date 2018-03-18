'use strict';

const
    express = require('express');

let router = express.Router();

router.get('/home', function(req, res){
    res.send("Hello!");
});

module.export = router;
