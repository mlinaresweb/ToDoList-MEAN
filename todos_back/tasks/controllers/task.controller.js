'use strict'

const taskModel = require('../models/task.model');

exports.getAllItems = (request, response) => {
    console.log('received getAllItems request');
  
    taskModel.getItems().then((items, error) => {
      if (error) {
        throw error.message;
      }
      if (items) {
       
        const itemShows = [];
  
       
        items.forEach((item) => {
         
          if (item && item.created_at) {
            const date = item.created_at.substring(0, 10); 
            const time = item.created_at.substring(11); 
     
            const itemShow = {
              _id: item._id,
              description: item.description,
              date: date,
              time: time
            };
            itemShows.push(itemShow);
          }
        });
        return response.status(200).send(itemShows);
      } else {
        return response.status(204);
      }
    }).catch((error) => {
      throw error.message;
    });
  };
exports.addItem = (request, response) => {
    console.log('Received addItem request');
  
    const { description, created_at } = request.body;
    const item = { description:description, created_at:created_at };
  
    console.log(item.created_at)

    taskModel.addItem(item)
      .then((item) => {
        if (item) {
          return response.status(200).send({ info: true });
        } else {
          console.error('Error adding task');
          return response.status(500);
        }
      })
      .catch((error) => {
        console.error(error);
        return response.status(500).send({ error: 'Error adding task' });
      });
  };
  

exports.editTodo = (request, response) => {
  console.log('Received editTodo request');

  // Obtener el id de la tarea a modificar
  const itemId = request.body.id;

  // Obtener la nueva descripción de la tarea
  const newDescription = request.body.description;

  // Crear un objeto de tarea con la nueva descripción
  const item = {
    _id: itemId,
    description: newDescription
  };

  // Llamar a la función del modelo para actualizar la tarea
  taskModel.editTodo(item).then((result) => {
    console.log('Tarea modificada con éxito');
    return response.status(200).send({info: true});
  }).catch((error) => {
    console.error('Error al modificar la tarea');
    return response.status(500).send({info: false});
  });
}

  

exports.deleteItem = (request, response) => {
    console.log('Received deleteItem request');
    console.log(request.params.id);
  
    taskModel.deleteItem(request.params.id)
      .then((item) => {
        if (item) {
          return response.status(200).send({ info: true });
        } else {
          console.error('Error deleting item');
          return response.status(500);
        }
      })
      .catch((error) => {
        throw error.message;
      });
  };