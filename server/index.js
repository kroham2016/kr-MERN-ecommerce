const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key')
const {User} = require('./models/user')
const {auth} = require('./middleware/auth');

 mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,   
    useCreateIndex: true
})
.then(() => console.log('DB connected successfully.'))
.catch(err => console.error(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
 

app.post('/api/user/register',(req,res) => {
    const user = new User(req.body);
    user.save((err,userData) => {
        if(err) return res.json({success: false, err , request: req.body});
        
        return res.status(200).json({
            success: true,
            data: userData
        }); 
    });
});

app.post('/api/user/login', (req,res) =>{
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
            res.cookie('x_auth', user.token)
                .status(200)
                .json({
                    loginSuccess: true
                })
        })
    })
})

app.get('/', (req,res) => {
    res.json({
        "message" : "Hello World"
    })
})

app.get('/api/user/auth', auth, (req,res) => {
    //send the data from auth middleware to the client 
    res.status(200).json({
        _id: req._id,
        isAuth: true,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        role: req.user.role
    })
})

app.get('/api/user/logout', auth, (req,res) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: ""}, (err,doc) =>{
        if(err) return res.json({success: false, err});
        return res.status(200).send({
            success: true,
            message: "Successfully logged out."
        })
    })
})
app.listen(3000);

