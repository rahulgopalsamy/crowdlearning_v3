let
    expect = require('chai').expect,
    server = require('../index'),
    request = require('supertest');

let userCredntials = {
    email: 'rahulgop@buffalo.edu',
    password: '12345678'
}

const authenicatedUser = request.agent(server);

before(function(done){
    authenicatedUser
        .post('\login')
        .send(userCredntials)
        .end(function(err, res){
            expect(res.statusCode).to.equal(200);
            expect('Location', '/home');
            done();
        });
    });

describe('GET /profile', function(done){
    it('should return a 200 response if the user is logged in',
        function(done){
            authenicatedUser.get('/profile')
            .expect(200, done);
    });

    it('should return a 302 response and redirect to /login',
        function(done){
            request(server).get('/profile')
            .expect('Location', '/login')
            .expect(302, done);
    });
});
