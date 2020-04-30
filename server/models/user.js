const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const jwt = require('jsonwebtoken');
const moment = require('moment');

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        maxlength: 50
    },
    lastName: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    },
    image: String
});

userSchema.pre('save', function(next){
    var user = this;
    
    if(user.isModified('password')){

        bcrypt.genSalt(SALT_ROUNDS, function(err,salt){
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err,hash){
                if(err) return next(err);
                user.password = hash ;
                next();
            })
        });
    } else{
        next();
    }
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secret');
    var oneHour = moment().add(1,'hour').valueOf();

    user.token = token;
    user.tokenExp = oneHour;

    user.save(function (err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}

userSchema.statics.findByToken = function(token,cb) {
    var user = this;
    jwt.verify(token, 'secret', function(err,decode) {
        user.findOne({"_id": decode, "token": token}, function(err,user){
            if(err) return cb(err);
            cb(null, user);
        });
    });
}
const User = mongoose.model('User', userSchema);
module.exports = { User };
