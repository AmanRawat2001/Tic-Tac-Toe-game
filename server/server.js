const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const gameRoutes = require('./routes/gameRoutes');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tictactoe';

app.use(cors());
app.use(express.json());

app.use('/api', gameRoutes);

app.get('/api/health', (req, res) => {
  const mongoStatus = mongoose.connection.readyState;
  const statusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  res.json({ 
    message: 'Tic-Tac-Toe API is running!', 
    timestamp: new Date().toISOString(),
    mongodb: {
      status: statusMap[mongoStatus],
      readyState: mongoStatus
    },
    environment: process.env.NODE_ENV || 'development'
  });
});

app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// MongoDB connection - works for both local and serverless
let isConnected = false;

const connectToDatabase = async () => {
  console.log('Checking MongoDB connection...');
  console.log('Current connection state:', mongoose.connection.readyState);
  console.log('Is connected flag:', isConnected);
  
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log('Using existing connection');
    return;
  }

  try {
    if (mongoose.connection.readyState === 0) {
      console.log('Creating new MongoDB connection...');
      console.log('MongoDB URI exists:', !!MONGODB_URI);
      console.log('MongoDB URI starts with:', MONGODB_URI ? MONGODB_URI.substring(0, 20) + '...' : 'undefined');
      
      await mongoose.connect(MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 15000, // 15 seconds
        socketTimeoutMS: 45000, // 45 seconds
        family: 4 // Use IPv4
      });
    }
    isConnected = true;
    console.log('✅ Connected to MongoDB successfully');
    console.log('Final connection state:', mongoose.connection.readyState);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('Error code:', error.code);
    isConnected = false;
    throw error;
  }
};

// Connect to MongoDB for each request (needed for serverless)
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ error: 'Database connection failed', details: error.message });
  }
});

// For local development
if (process.env.NODE_ENV) {
  const PORT = process.env.PORT || 3001;
  
  // Initialize MongoDB connection for local development
  connectToDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📊 API endpoints:`);
      console.log(`   GET  /api/health - Health check`);
      console.log(`   POST /api/game - Save game result`);
      console.log(`   GET  /api/history - Get game history`);
      console.log(`   GET  /api/stats - Get game statistics`);
    });
  }).catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
}

// Export for Vercel
module.exports = app;