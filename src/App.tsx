import PhaserGameRender from './components/game/PhaserGameRender.tsx';
import createGame from './components/game/createGame.ts';
import GameLayout from '@/components/layouts/gameLayout/GameLayout.tsx';

function App() {
  return (
    <GameLayout>
      <PhaserGameRender gameFactory={createGame} />
    </GameLayout>
  );
}

export default App;
