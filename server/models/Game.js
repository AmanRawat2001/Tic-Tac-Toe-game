const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  playerX: {
    type: String,
    required: true,
    trim: true
  },
  playerO: {
    type: String,
    required: true,
    trim: true
  },
  winner: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;