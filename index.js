const express = require('express');
const app = express();
const mongoose = require('mongoose');
const MONGO_URI='mongodb+srv://keon:91YMqO2heiTjVVfo@cluster0-0g8mh.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {useNewUrlParser: true })
.then(() => {
    console.log('DB Connected successfully.')
})
.catch(err => console.error(err));

app.get('/', (req,res) => {
    res.send('hello world');
});

app.listen(3000);

