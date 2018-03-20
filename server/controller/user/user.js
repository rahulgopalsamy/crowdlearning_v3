'use strict';

const login = function loginUsingPassportJsLocalLogin(req, res){
    console.log(req.session);
   res.send("You are logged in");
};

const register = function registerUsingPassportJsLocal(req, res){
    console.log(req.body);
    res.send("Hello");
};


module.exports = {
    login:login,
    register:register
}
