require("dotenv").config();

const app = require('express')();
const mongoose = require('mongoose');

var http = require('http').Server(app);

const paymentRoute = require('./routes/addCard');
const port = process.env.PORT;

app.use('/', paymentRoute);



mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected');
    app.listen(port);
    console.log(port);
  })
  .catch(err => {
    console.log(err);
  });