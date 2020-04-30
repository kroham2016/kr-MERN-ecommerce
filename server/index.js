const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const cors = require('cors');
const path = require('path');

const config = require('./config/key')

//connect to server 
const mongoose = require('mongoose');
 mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,   
    useCreateIndex: true
})
.then(() => console.log('DB connected successfully.'))
.catch(err => console.error(err));

//mount middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//use express router 
app.use('/api/users',require('./routes/users'));

//serve images on server to react
app.use('/uploads',express.static('uploads'));

if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static(path.join(__dirname, 'client/build'));

    //serve build folder index.html for all routes 
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(_dirname,'../client','build','index.html'));
    })
}

const port = process.env.PORT || 5000;
app.listen( port , () =>{
    console.log(`Listening on ${port}...`);
});

