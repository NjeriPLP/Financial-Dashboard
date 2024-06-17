const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  symbol: String,
  date: String,
  open: Number,
  close: Number,
  high: Number,
  low: Number,
  volume: Number
});

module.exports = mongoose.model('Data', dataSchema);
