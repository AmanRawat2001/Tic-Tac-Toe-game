import React, { useState } from 'react';
import Game from './components/Game';
import GameHistory from './components/GameHistory';

type ActiveTab = 'game' | 'history';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('game');
  const [gameHistoryUpdated, setGameHistoryUpdated] = useState<number>(0);

  const handleGameEnd = (): void => {
    setGameHistoryUpdated(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow-sm border-b border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Tic-Tac-Toe Game</h1>
        <nav className="flex justify-center gap-4">
          <button
            className={`px-4 py-2 border font-medium transition-colors ${
              activeTab === 'game'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('game')}
          >
            Play Game
          </button>
          <button
            className={`px-4 py-2 border font-medium transition-colors ${
              activeTab === 'history'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('history')}
          >
            Game History
          </button>
        </nav>
      </header>

      <main className="p-6 flex justify-center">
        {activeTab === 'game' ? (
          <Game onGameEnd={handleGameEnd} />
        ) : (
          <GameHistory refreshTrigger={gameHistoryUpdated} />
        )}
      </main>
    </div>
  );
};

export default App;
