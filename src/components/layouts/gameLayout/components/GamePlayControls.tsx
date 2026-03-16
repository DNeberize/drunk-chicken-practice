import { AutoPlayIcon, TurboIcon } from '@/assets/svg/SvgToTsx.tsx';

function GamePlayControls() {
  return (
    <div className={'w-18 h-full p-3 bg-[#131316] rounded-[20px]'}>
      <div
        className='h-full w-full flex flex-col gap-2 items-center justify-center border border-solid border-white/10 opacity-50 rounded-xl'
        style={{
          background: 'radial-gradient(100% 100% at 50% 0%, #1B1B20 0%, #2F2F36 100%)',
        }}
      >
        <button className={'w-6 h-6 cursor-pointer'}>
          <AutoPlayIcon className={'w-6 h-6'}></AutoPlayIcon>
        </button>
        <div className={'w-7 h-[1px] bg-white/20 '}></div>
        <button className={'w-6 h-6 cursor-pointer'}>
          <TurboIcon className={'w-6 h-6'}></TurboIcon>
        </button>
      </div>
    </div>
  );
}

export default GamePlayControls;
