/*jshint esversion: 6*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  'text': String
});

mongoose.model('Todo', todoSchema);
