'use strict';

const
    express = require('express'),
    bodyparser = require('body-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    passport = require('passport'),
    mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

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
        //Establishing database conncetion
        mongoose.connect(config.mongo)
        require('../configs/passport')(passport);
        // middleware for parsing json
        server.use(bodyparser.json());
        server.use(bodyparser.urlencoded({ extended: false }));

        // session middleware (persistent storage)
        server.use(session({
            store : new MongoStore ({
                url : config.sessionSetting.store.url,
                ttl: config.sessionSetting.store.ttl
            }),
            secret: config.sessionSetting.secret,
            saveUninitalized: config.sessionSetting.saveUninitalized,
            resave: config.sessionSetting.resave,
            cookie: config.sessionSetting.cookie,
            name: config.sessionSetting.name
        }));
        //setting View engine & View Directory
        server.set('views', server.get('viewDir'));
        server.set('view engine', 'ejs');
        server.use(express.static(config.public_path));


        //Intialising authentication
        server.use(passport.initialize());
        server.use(passport.session());

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
