import BetAmountControls from '@/components/layouts/gameLayout/components/BetAmountControls.tsx';
import JumpControls from '@/components/layouts/gameLayout/components/JumpControls.tsx';
import GamePlayControls from '@/components/layouts/gameLayout/components/GamePlayControls.tsx';

interface Props {
  children: React.ReactNode;
}
function GameLayout({ children }: Props) {
  return (
    <div className={'flex flex-col items-center relative h-screen'}>
      <div className='flex-1'></div>
      <main className={'absolute top-0 h-full w-full'}>{children}</main>
      <div className='z-10 grid h-[104px] grid-cols-3 gap-3 my-container'>
        <BetAmountControls />
        <JumpControls />
        <div>
          <GamePlayControls />
        </div>
      </div>

      <footer className={'h-10'}></footer>
    </div>
  );
}

export default GameLayout;
