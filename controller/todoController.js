/*jshint esversion: 6*/
const express = require('express');
const todoRouter = express.Router();
const mongoose = require('mongoose');
const TodoModel = mongoose.model('Todo');

function todoController(app) {
  //get all todos
  todoRouter.get('/all', (req, res)=>{
    TodoModel.find((err, data)=>{
      if(err)
        res.send(err);
      res.json(data);
    });
  });

  //post a todo and return all todos
  todoRouter.post('/create',(req, res)=>{
    var newTodo = new TodoModel({
      text : req.body.text
    });

    newTodo.save((err)=>{
      if(err)
        res.send(err);
      else {
        TodoModel.find((err, data)=>{
          if(err)
            res.send(err);
          res.json(data);
        });
      }
    });
  });

  todoRouter.delete('/:todo_id', (req, res)=>{
    TodoModel.remove({
      _id:req.params.todo_id
    }, (err, data)=>{
      if(err)
        res.send(err);
      else {
        TodoModel.find((err, data)=>{
          if(err)
            res.send(err);
          res.json(data);
        });
      }
    });
  });

  app.use('/api/todo', todoRouter);
}

module.exports.todoController = todoController;
