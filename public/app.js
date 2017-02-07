/*jshint esversion: 6*/

const todoModule = angular.module('todoModule', []);

todoModule.controller('todoCtrl', ($scope, $http)=>{
  $scope.formData = {};

  //get all todos
  $http.get('/api/todo/all').then((data) => {
      $scope.todos = data.data;
  })
  .catch((data) => {
      console.log('Error: ' + data);
  });

  //create a todo
  $scope.createTodo = function(){
    $http.post('/api/todo/create', $scope.formData).then((data) => {
        $scope.todos = data.data;
        $scope.formData.text='';
    })
    .catch((data) => {
        console.log('Error: ' + data);
    });
  };

  //delete a todo
  $scope.deleteTodo = function(id){
    $http.delete('/api/todo/' + id)
    .then((data) => {
        $scope.todos = data.data;
    })
    .catch((data) => {
        console.log('Error: ' + data);
    });
  };

});
