const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

router.post('/game', async (req, res) => {
  try {
    const { playerX, playerO, winner, date } = req.body;

    // Validate required fields
    if (!playerX || !playerO || !winner) {
      return res.status(400).json({
        error: 'Missing required fields: playerX, playerO, and winner are required'
      });
    }

    const newGame = new Game({
      playerX: playerX.trim(),
      playerO: playerO.trim(),
      winner: winner.trim(),
      date: date ? new Date(date) : new Date()
    });

    const savedGame = await newGame.save();
    res.status(201).json(savedGame);
  } catch (error) {
    console.error('Error saving game:', error);
    res.status(500).json({ error: 'Failed to save game result' });
  }
});

router.get('/history', async (req, res) => {
  try {
    const games = await Game.find()
      .sort({ date: -1 })
      .limit(100);

    res.json(games);
  } catch (error) {
    console.error('Error fetching game history:', error);
    res.status(500).json({ error: 'Failed to fetch game history' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const totalGames = await Game.countDocuments();
    
    // Count wins per player
    const playerStats = await Game.aggregate([
      {
        $match: { winner: { $ne: 'Draw' } }
      },
      {
        $group: {
          _id: '$winner',
          wins: { $sum: 1 }
        }
      },
      {
        $sort: { wins: -1 }
      }
    ]);

    const draws = await Game.countDocuments({ winner: 'Draw' });

    res.json({
      totalGames,
      draws,
      playerStats
    });
  } catch (error) {
    console.error('Error fetching game stats:', error);
    res.status(500).json({ error: 'Failed to fetch game statistics' });
  }
});

module.exports = router;