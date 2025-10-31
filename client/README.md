# Frontend for Tic-Tac-Toe Game

This is the React part of my Tic-Tac-Toe game! It's built with some modern tools that I wanted to learn.

## What's inside

- **React 18** - For the game interface
- **TypeScript** - Adds type checking (helps catch bugs)
- **Vite** - Way faster than Create React App
- **Tailwind CSS** - For styling without writing custom CSS

## Running this part

From the main project folder:
```bash
cd client
npm install
npm run dev
```

That's it! It should open your browser automatically.

## What the files do

- `src/App.tsx` - Main page with the tabs for Game and History
- `src/components/Game.tsx` - The actual Tic-Tac-Toe game logic
- `src/components/GameHistory.tsx` - Shows past games
- `src/types/game.ts` - TypeScript types (helps prevent bugs)

## If you want to build for production

```bash
npm run build
```

Creates optimized files in the `dist` folder that you could deploy somewhere.

---

**Note:** This frontend needs the backend server running to save/load game history. Check the main README for how to start the server!