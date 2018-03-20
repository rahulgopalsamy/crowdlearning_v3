'use strict';

const
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    salt = bcrypt.genSaltSync(8);

const userSchema = mongoose.Schema({
    email: {type:String, required:true},
    password : {type:String, required:true}
});

userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, salt, null);
}

userSchema.methods.validPassword = function(unhashedpassword){
    return bcrypt.compareSync(unhashedpassword, this.password);
}

module.exports = mongoose.model('User', userSchema);
