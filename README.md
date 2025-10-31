# Tic-Tac-Toe Game

A simple full-stack Tic-Tac-Toe game with game history.

## Tech Stack
- React + TypeScript
- Node.js + Express  
- MongoDB Atlas
- Tailwind CSS

## Prerequisites
- Node.js (get it from nodejs.org)

## Quick Start
```bash
git clone <your-repo-url>
cd interview
./setup.sh
```

Opens at `http://localhost:5173`

## Features
- Two-player Tic-Tac-Toe
- Player names
- Game history
- Win/draw detection

## Manual Setup (if needed)
```bash
npm install
cd server && npm install  
cd ../client && npm install
cd .. && npm run dev
```

## Project Structure
```
client/   # React frontend
server/   # Node.js backend  
setup.sh  # One-command setup
```

## API Endpoints
- `GET /api/health` - Health check
- `GET /api/history` - Game history
- `POST /api/game` - Save game

## Troubleshooting
If setup fails: `chmod +x setup.sh` then try again

## 🚀 Deployment

### Production Build

```bash
# Build React app for production
cd client
npm run build

# The built files will be in client/build/
```

### Environment Variables

For production, set these environment variables:

```bash
# Server
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tictactoe

# Or for MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tictactoe
```

### � **Bonus Features Implemented**
- ✅ **TypeScript Integration**: Full type safety for better development experience
- ✅ **Vite Development**: Fast HMR and optimized builds
- ✅ **Game statistics/leaderboard** via `/api/stats` endpoint
- ✅ **MongoDB Atlas**: Cloud database with pre-configured credentials
- ✅ **Responsive mobile design**
- ✅ **Modern UI with animations**
- ✅ **Comprehensive error handling**
- ✅ **RESTful API design**
- ✅ **Type-safe API interactions**

## 🐛 Troubleshooting

### Common Issues

**"Setup script fails"**
- Make sure you have Node.js installed first
- Try `chmod +x setup.sh` to make it executable
- If it still fails, run `bash setup.sh` instead

**"Can't connect to database"**
- The server might not be running properly
- Sometimes the Atlas connection is slow, just wait a few seconds

**"Game history not loading"**  
- Make sure the setup script finished successfully
- Check the browser console (F12) for any red error messages

**"Port already in use"**
- Some other app is using the same port. Try `pkill -f "node\|vite"` to kill running processes

**General debugging:**
- Check the terminal where setup.sh is running for error messages
- Browser dev tools (F12) are your friend
- When in doubt, stop everything (Ctrl+C) and run `./setup.sh` again

## About this project

I built this to practice full-stack development and learn some new technologies. Took me a few evenings to get everything working properly, but I'm pretty happy with how it turned out!

The code isn't perfect but it works well and demonstrates the key concepts. Feel free to mess around with it or use it as a starting point for your own projects.

---

Built with: React, TypeScript, Node.js, MongoDB, and way too much coffee ☕