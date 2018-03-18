'use strict';

const
    express = require('express');

let router = express.Router();
router.get('/api', function(req, res){
    res.send("Api is running!");
});

module.export = router;
