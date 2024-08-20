const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  ratings: { type: Number, required: true },
});

module.exports = mongoose.model('Book', bookSchema);


