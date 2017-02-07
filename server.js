/*jshint esversion: 6 */
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


//open a connection to Mongo DB
mongoose.connect("mongodb://localhost:27017/MEAN-TODO");

//serve static files
app.use(express.static(__dirname+'/public'));
//logging during dev
app.use(logger('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(methodOverride());

//load the model in memory
require(__dirname+'/models/todoModel');
const route = require('./controller/todoController.js');
route.todoController(app);

//default route to load index.html
app.get('*', (req, res)=>{
  res.sendFile(__dirname+'/public/index.html');
});

//start server and listen on port 8080
app.listen(8080, ()=>{console.log('server started');});
