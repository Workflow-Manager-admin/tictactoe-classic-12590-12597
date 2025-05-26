"use client";

import TicTacToeContainer from '@/components/TicTacToe/TicTacToeContainer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <TicTacToeContainer />
    </div>
  );
}
