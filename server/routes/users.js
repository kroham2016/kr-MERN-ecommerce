const express = require('express');
const router = express.Router();

const {User} = require('../models/User')
const {auth} = require('../middleware/auth');


router.post('/register',(req,res) => {
    const user = new User(req.body);

    user.save((err,userData) => {
        if(err) return res.json({success: false, err});
        
        return res.status(200).json({
            success: true
        }); 
    });
});

router.post('/login', (req,res) =>{
    User.findOne({email: req.body.email}, (err, user) => {
        // check if email exists
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found."
            });
        }
        //compare the request pw with db pw
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch){
                return res.json({
                    loginSuccess: false,
                    message: "Auth failed, wrong password."
                })
            }
        })
        //generate the token
        user.generateToken((err,user)=>{
            if(err) return res.status(400).send(err);
            res.cookie('w_authExp',user.tokenExp);
            res.cookie('w_auth', user.token)
                .status(200)
                .json({
                    loginSuccess: true,
                    userId: user._id
                })
        })
    })
})

router.get('/', (req,res) => {
    res.send('~~Hello from default page');
})

router.get('/auth', auth, (req,res) => {
    //send the data from auth middleware to the client 
    res.status(200).json({
        _id: req._id,
        isAdmin: req.user.role === 0 ? false: true,
        isAuth: true,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        role: req.user.role,
        image: req.user.image
    })
})

router.get('/logout', auth, (req,res) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: "",tokenExp:""}, (err,doc) =>{
        if(err) return res.json({success: false, err});
        return res.status(200).send({
            success: true,
            message: "Successfully logged out."
        })
    })
})

module.exports = router;