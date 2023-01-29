'use strict'

const TaskController = require('../controllers/task.controller');

exports.taskRoutes = function(app){
    app.get('/api/get_items', TaskController.getAllItems);
    app.post('/api/add_item',TaskController.addItem);
    app.delete('/api/delete_item/:id', TaskController.deleteItem);
    app.put('/api/edit_item', TaskController.editTodo);
}
