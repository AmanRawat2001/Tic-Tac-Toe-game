import React, { useState, useEffect } from 'react';
import axios from 'axios';
import type { GameResult, GameHistoryProps } from '../types/game';

const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:3001' 
  : 'https://tic-tac-toe-game-g5dy.vercel.app';

const GameHistory: React.FC<GameHistoryProps> = ({ refreshTrigger }) => {
  const [games, setGames] = useState<GameResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGameHistory();
  }, [refreshTrigger]);

  const fetchGameHistory = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get<GameResult[]>(`${API_BASE_URL}/api/history`);
      setGames(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching game history:', error);
      setError('Failed to load game history. Please make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | Date): string => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Game History</h2>
        <div className="text-center py-8 text-gray-600">Loading game history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Game History</h2>
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded mb-4 text-center">
          {error}
        </div>
        <div className="text-center">
          <button 
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            onClick={fetchGameHistory}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Game History ({games.length} games played)
      </h2>
      
      {games.length === 0 ? (
        <div className="text-center py-8 text-gray-600 space-y-2">
          <p>No games played yet!</p>
          <p>Start playing to see your game history here.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded max-h-96 overflow-y-auto">
          {games.map((game: GameResult, index: number) => (
            <div key={game._id || index} className="p-4 border-b border-gray-100 last:border-b-0">
              <div className="font-semibold text-gray-800 mb-1">
                Game #{games.length - index}
              </div>
              <div className="text-gray-700 mb-1">
                <strong>{game.playerX}</strong> (X) vs <strong>{game.playerO}</strong> (O)
              </div>
              <div className="font-medium text-gray-900 mb-1">
                {game.winner === 'Draw' 
                  ? "Result: It's a draw!" 
                  : `Winner: ${game.winner}`
                }
              </div>
              <div className="text-sm text-gray-500">
                Played on: {formatDate(game.date)}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-6">
        <button 
          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
          onClick={fetchGameHistory}
        >
          Refresh History
        </button>
      </div>
    </div>
  );
};

export default GameHistory;