"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { Board } from './Board';
import { BoardState, GameState, Player } from './types';

/**
 * Main container component for the Tic Tac Toe game.
 * Manages game state and handles game logic.
 */
const TicTacToeContainer: React.FC = () => {
  // Initialize game state
  const initialState: GameState = {
    board: Array(9).fill(null),
    nextPlayer: 'X',
    status: 'playing',
    winner: null,
    winningLine: null,
  };
  
  const [gameState, setGameState] = useState<GameState>(initialState);
  const { board, nextPlayer, status, winner, winningLine } = gameState;
  
  /**
   * Calculate the winner of the game
   */
  const calculateWinner = useCallback((squares: BoardState): { winner: Player | null, winningLine: number[] | null } => {
    // All possible winning combinations (rows, columns, diagonals)
    const lines = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // diagonal from top-left
      [2, 4, 6], // diagonal from top-right
    ];
    
    // Check all possible winning combinations
    for (const line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { 
          winner: squares[a] as Player, 
          winningLine: line 
        };
      }
    }
    
    return { winner: null, winningLine: null };
  }, []);
  
  /**
   * Check if the game is a draw
   */
  const isDraw = useCallback((squares: BoardState, winnerExists: boolean): boolean => {
    // If there's a winner, it's not a draw
    if (winnerExists) return false;
    
    // If all squares are filled, it's a draw
    return squares.every(square => square !== null);
  }, []);
  
  /**
   * Handle a square click
   */
  const handleClick = useCallback((i: number) => {
    // If the game is over or the square is already filled, do nothing
    if (status !== 'playing' || board[i]) {
      return;
    }
    
    // Create a copy of the board
    const newBoard = [...board];
    newBoard[i] = nextPlayer;
    
    // Check for a winner
    const { winner: newWinner, winningLine: newWinningLine } = calculateWinner(newBoard);
    const gameWon = !!newWinner;
    const gameDraw = isDraw(newBoard, gameWon);
    
    // Update the game state
    setGameState({
      board: newBoard,
      nextPlayer: nextPlayer === 'X' ? 'O' : 'X',
      status: gameWon ? 'won' : gameDraw ? 'draw' : 'playing',
      winner: newWinner,
      winningLine: newWinningLine,
    });
  }, [board, nextPlayer, status, calculateWinner, isDraw]);
  
  /**
   * Restart the game
   */
  const restartGame = useCallback(() => {
    setGameState(initialState);
  }, []);
  
  /**
   * Generate status message based on game state
   */
  const statusMessage = useMemo(() => {
    if (status === 'won') {
      return `Winner: ${winner}`;
    } else if (status === 'draw') {
      return 'Game ended in a draw!';
    } else {
      return `Next player: ${nextPlayer}`;
    }
  }, [status, winner, nextPlayer]);
  
  return (
    <div className="flex flex-col items-center gap-6 p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-2">Tic Tac Toe</h1>
      
      <div className="text-xl mb-4" data-testid="status">
        {statusMessage}
      </div>
      
      <Board 
        squares={board} 
        onClick={handleClick} 
        winningLine={winningLine}
      />
      
      <button
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        onClick={restartGame}
        data-testid="restart-button"
      >
        Restart Game
      </button>
    </div>
  );
};

export default TicTacToeContainer;
