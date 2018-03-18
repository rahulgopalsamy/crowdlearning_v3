'use strict';

const
    express = require('express'),
    path = require('path'),
    bodyparser = require('body-parser');

module.exports = function(){
    let server = express(),
        create,
        start;

    create = function(config) {
        let routes = require('./routes');

        //Server setting
        server.set('env', config.env);
        server.set('port', config.port);
        server.set('hostname', config.hostname);
        server.set('viewDir', config.viewDir)

        // middleware for parsing json
        server.use(bodyparser.json());

        //setting View engine & View Directory
        server.set('views', server.get('viewDir'));
        server.set('view engine', 'ejs');
        server.use(express.static(config.public_path));

        //initalising routes
        routes.init(server);
    };

    start = function() {
        let hostname = server.get('hostname'),
            port = server.get('port');

         server.listen(port, function(){
            console.log('Express server listening on - http://' + hostname + ':' + port);
         });
    };

    return {
        create: create,
        start: start
    };
 };
