const
    appRoute = require('./app'),
    //staticRoute = require('./app/static'),
    studentRoute = require('./app/student'),
    instructorRoute = require('./app/instructor');


function init(server){
      server.get('*', function (req, res, next) {
        console.log('Request was made to: ' + req.originalUrl);
        return next();
    });

    server.get('/', function(req, res){
        res.render('pages/index');
    });
    server.use('/user', appRoute)
    //server.use('/project', staticRoute);
    server.use('/student', studentRoute);
    server.use('/instructor', instructorRoute);

}

module.exports = {
    init: init
};
