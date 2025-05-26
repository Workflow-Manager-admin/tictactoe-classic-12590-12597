/**
 * Type definitions for the Tic Tac Toe game
 */

// Player type (X or O)
export type Player = 'X' | 'O';

// Type for each cell in the board
export type SquareValue = Player | null;

// Type for the game board - a 3x3 grid
export type BoardState = SquareValue[];

// Possible game status
export type GameStatus = 'playing' | 'draw' | 'won';

// Game state interface
export interface GameState {
  board: BoardState;
  nextPlayer: Player;
  status: GameStatus;
  winner: Player | null;
  winningLine: number[] | null;
}
