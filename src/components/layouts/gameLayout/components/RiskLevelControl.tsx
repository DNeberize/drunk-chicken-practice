import { useState } from 'react';
import ExpanderContainer from '@/components/misc/expanderContainer/ExpanderContainer.tsx';
import { ArrowIcon } from '@/assets/svg/SvgToTsx.tsx';

function RiskLevelControl() {
  const [chosenLevel, setChosenLevel] = useState(0);
  return (
    <div className={'w-18 h-full p-3 grow bg-[#131316] rounded-[20px]'}>
      <div
        className='h-full w-full flex p-3 gap-2 items-center justify-between border border-solid border-white/10 opacity-50 rounded-xl'
        style={{
          background: 'radial-gradient(100% 100% at 50% 0%, #1B1B20 0%, #2F2F36 100%)',
        }}
      >
        <div className='flex flex-col gap-1'>
          <p className={'font-semibold text-[#9798a2] text-[16px]'}>Risk Level</p>
          <div className={'h-[25px]'}>
            <ExpanderContainer expanded={chosenLevel === 0}>
              <p className={'font-bold text-white text-xl capitalize'}>Easy</p>
            </ExpanderContainer>
            <ExpanderContainer expanded={chosenLevel === 1}>
              <p className={'font-bold text-white text-xl capitalize'}>Medium</p>
            </ExpanderContainer>
            <ExpanderContainer expanded={chosenLevel === 2}>
              <p className={'font-bold text-white text-xl capitalize'}>Hard</p>
            </ExpanderContainer>
          </div>
        </div>
        <div className='flex flex-col h-full justify-between'>
          <button
            className={'w-6 h-6 cursor-pointer'}
            onClick={() => {
              setChosenLevel(chosenLevel + 1);
            }}
          >
            <ArrowIcon></ArrowIcon>
          </button>
          <button
            className={'w-6 h-6 cursor-pointer rotate-180'}
            onClick={() => {
              setChosenLevel(chosenLevel - 1);
            }}
          >
            <ArrowIcon></ArrowIcon>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RiskLevelControl;
