export interface GameResult {
  _id?: string;
  playerX: string;
  playerO: string;
  winner: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GameStats {
  totalGames: number;
  draws: number;
  playerStats: Array<{
    _id: string;
    wins: number;
  }>;
}

export type SquareValue = 'X' | 'O' | null;
export type Board = SquareValue[];

export interface GameProps {
  onGameEnd: () => void;
}

export interface GameHistoryProps {
  refreshTrigger?: number;
}

export interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  disabled: boolean;
}