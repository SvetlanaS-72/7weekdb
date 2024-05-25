const mongoose = require('mongoose');
const users = require('./user');
const categories = require('./category');

const gameSchema = new mongoose.Schema({
  title: {
      // Поле со строковым значением
    type: String,
    // Явно указываем, что поле обязательно при записи в базу нового документа
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  developer: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: users,
  }],
  // Добавляем поле для списка категорий
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: categories,
  }],
});


const games = mongoose.model('games', gameSchema);
module.exports = games;