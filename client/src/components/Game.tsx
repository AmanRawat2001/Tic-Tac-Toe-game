import React, { useState } from 'react';
import axios from 'axios';
import type { GameProps, SquareValue, Board, GameResult } from '../types/game';

const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:3001' 
  : 'https://tic-tac-toe-game-g5dy.vercel.app';

const Game: React.FC<GameProps> = ({ onGameEnd }) => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [playerX, setPlayerX] = useState<string>('Player 1');
  const [playerO, setPlayerO] = useState<string>('Player 2');
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Check winner logic
  const calculateWinner = (squares: Board): SquareValue => {
    const lines: number[][] = [
      [0, 1, 2], // rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // diagonals
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number): void => {
    if (board[i] || gameOver) return;

    const newBoard: Board = board.slice();
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const winner = calculateWinner(newBoard);
    const isDraw = !winner && newBoard.every(square => square !== null);

    if (winner || isDraw) {
      setGameOver(true);
      saveGame(winner, isDraw);
    }

    setIsXNext(!isXNext);
  };

  const saveGame = async (winner: SquareValue, isDraw: boolean): Promise<void> => {
    try {
      const gameResult: Omit<GameResult, '_id' | 'createdAt' | 'updatedAt'> = {
        playerX,
        playerO,
        winner: isDraw ? 'Draw' : (winner === 'X' ? playerX : playerO),
        date: new Date()
      };

      await axios.post(`${API_BASE_URL}/api/game`, gameResult);
      onGameEnd();
    } catch (error) {
      console.error('Error saving game:', error);
    }
  };

  const restartGame = (): void => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);
  
  let status: string;
  if (winner) {
    const winnerName = winner === 'X' ? playerX : playerO;
    status = `Winner: ${winnerName}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    const currentPlayer = isXNext ? playerX : playerO;
    const currentSymbol = isXNext ? 'X' : 'O';
    status = `Next player: ${currentPlayer} (${currentSymbol})`;
  }

  const renderSquare = (i: number): React.ReactElement => {
    return (
      <button
        key={i}
        className={`w-20 h-20 bg-white border border-gray-400 text-2xl font-bold hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors ${
          board[i] === 'X' ? 'text-red-600' : board[i] === 'O' ? 'text-blue-600' : 'text-gray-800'
        }`}
        onClick={() => handleClick(i)}
        disabled={gameOver || !!board[i]}
      >
        {board[i]}
      </button>
    );
  };

  const handlePlayerXChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPlayerX(e.target.value);
  };

  const handlePlayerOChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPlayerO(e.target.value);
  };

  const isGameStarted = board.some(square => square !== null);

  return (
    <div className="flex flex-col items-center space-y-6 max-w-md mx-auto">
      <div className="space-y-4 text-center">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="flex flex-col">
            <label htmlFor="playerX" className="text-sm font-medium text-gray-700 mb-1">
              Player X:
            </label>
            <input
              id="playerX"
              type="text"
              value={playerX}
              onChange={handlePlayerXChange}
              disabled={isGameStarted}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="playerO" className="text-sm font-medium text-gray-700 mb-1">
              Player O:
            </label>
            <input
              id="playerO"
              type="text"
              value={playerO}
              onChange={handlePlayerOChange}
              disabled={isGameStarted}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
        </div>
        
        <div className="text-lg font-semibold text-gray-800">{status}</div>
      </div>

      <div className="grid grid-cols-3 gap-1 p-1 bg-gray-800">
        {Array.from({ length: 9 }, (_, i) => renderSquare(i))}
      </div>

      <button 
        className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        onClick={restartGame}
      >
        New Game
      </button>
    </div>
  );
};

export default Game;