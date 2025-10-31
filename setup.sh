#!/bin/bash

echo "Setting up the game..."

# check node
if ! command -v node &> /dev/null; then
    echo "Need Node.js first - get it from nodejs.org"
    exit 1
fi

echo "Node.js: $(node --version)"

# install stuff
echo "Installing dependencies..."
npm install
cd server && npm install
cd ../client && npm install
cd ..

# quick test
echo "Testing server..."
cd server
npm start > /dev/null 2>&1 &
sleep 5
if curl -s localhost:3001/api/health > /dev/null; then
    echo "Server works"
    SERVER_OK=1
else
    echo "Server might have issues"
    SERVER_OK=0
fi
pkill -f "node.*server" 2>/dev/null
cd ..

echo ""
if [ "$SERVER_OK" = "1" ]; then
    echo "All set! Starting the game..."
    echo "Game: http://localhost:5173"
    echo "API: http://localhost:3001"
    echo ""
    npm run dev
else
    echo "Setup done but server test failed"
    echo "Try: npm run dev"
fi