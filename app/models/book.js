'use strict';

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
},
{
    timestamps: true
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
