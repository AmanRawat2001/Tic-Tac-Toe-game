const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const gameRoutes = require('./routes/gameRoutes');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tictactoe';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', gameRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Tic-Tac-Toe API is running!', 
    timestamp: new Date().toISOString() 
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📊 API endpoints:`);
    console.log(`   GET  /api/health - Health check`);
    console.log(`   POST /api/game - Save game result`);
    console.log(`   GET  /api/history - Get game history`);
    console.log(`   GET  /api/stats - Get game statistics`);
  });
}

// Export for Vercel
module.exports = app;