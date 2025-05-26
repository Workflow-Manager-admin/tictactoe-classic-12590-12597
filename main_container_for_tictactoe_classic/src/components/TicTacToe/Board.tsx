import React from 'react';
import { Square } from './Square';
import { BoardState } from './types';

interface BoardProps {
  squares: BoardState;
  onClick: (i: number) => void;
  winningLine: number[] | null;
}

/**
 * Board component that renders the 3x3 grid of squares
 */
export const Board: React.FC<BoardProps> = ({ squares, onClick, winningLine }) => {
  const renderSquare = (i: number) => {
    const isWinningSquare = winningLine?.includes(i) ?? false;
    
    return (
      <Square 
        key={i}
        index={i}
        value={squares[i]} 
        onClick={() => onClick(i)}
        isWinningSquare={isWinningSquare}
      />
    );
  };

  // Create the 3x3 grid
  return (
    <div className="grid grid-cols-3 gap-1 w-fit mx-auto">
      {Array(9).fill(null).map((_, i) => renderSquare(i))}
    </div>
  );
};
