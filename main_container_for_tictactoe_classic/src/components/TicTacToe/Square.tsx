import React from 'react';
import { SquareValue } from './types';

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  isWinningSquare: boolean;
  index: number;
}

/**
 * A component representing a single square in the Tic Tac Toe board
 */
export const Square: React.FC<SquareProps> = ({ 
  value, 
  onClick, 
  isWinningSquare, 
  index
}) => {
  return (
    <button
      className={`h-20 w-20 text-4xl font-bold border-2 border-gray-400 
                ${isWinningSquare ? 'bg-green-200 dark:bg-green-800' : 'bg-white dark:bg-gray-800'} 
                focus:outline-none transition-colors duration-300 ease-in-out
                hover:bg-gray-100 dark:hover:bg-gray-700`}
      onClick={onClick}
      data-testid={`square-${index}`}
    >
      {value}
    </button>
  );
};
