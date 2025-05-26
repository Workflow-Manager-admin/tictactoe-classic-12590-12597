import dynamic from 'next/dynamic';

// Using dynamic import with SSR disabled for the TicTacToeContainer
// since it contains client-side functionality
const TicTacToeContainer = dynamic(
  () => import('@/components/TicTacToe/TicTacToeContainer'),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <TicTacToeContainer />
    </div>
  );
}
