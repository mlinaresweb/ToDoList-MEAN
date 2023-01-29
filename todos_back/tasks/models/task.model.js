'use strict'


const mongoose = require('../../common/services/mongoose.service').moongose;

const itemsSchema = new mongoose.Schema({
    description: {
      type: mongoose.Schema.Types.String,
    },
    created_at: {
      type: mongoose.Schema.Types.String,
    }
  }, { versionKey: false })

itemsSchema.set('toJSON', {virtuals:false});

const Items = mongoose.model( 'items',itemsSchema, 'items');

exports.getItems = () =>{
    return new Promise((resolve, reject) =>{
        Items.find({}).exec((error, result) =>{
            if(error){
                reject(error.message);
                throw error.message;
            }
            if(result){
                resolve(result);
            }
        })
    }).catch(error =>{
        throw error.message;
    })
}

exports.addItem = (item) => {
  try {
    const Item = new Items({
      description: item.description,
      created_at: item.created_at
    });
    return Item.save().catch((error) => error.message);
  } catch (error) {
    throw error.message;
  }
};


exports.editTodo = (item) => {
  return new Promise((resolve, reject) => {
    // Utiliza el método "findByIdAndUpdate" para actualizar el documento con el ID especificado
    Items.findByIdAndUpdate(item._id, { description: item.description }, { new: true }, (error, result) => {
      if (error) {
        reject(error.message);
        throw error.message;
      }
      if (result) {
        resolve(result);
      }
    });
  }).catch((error) => {
    throw error.message;
  });
};


exports.deleteItem = (itemId) => {
    return new Promise((resolve, reject) => {
      // Utiliza el método "findByIdAndDelete" para eliminar el documento con el ID especificado
      Items.findByIdAndDelete(itemId, (error, result) => {
        if (error) {
          reject(error.message);
          throw error.message;
        }
        if (result) {
          resolve(result);
        }
      });
    }).catch((error) => {
      throw error.message;
    });
  };
