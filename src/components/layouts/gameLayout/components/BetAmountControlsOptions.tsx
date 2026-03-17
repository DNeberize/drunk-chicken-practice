import { betAmountOptions } from '@utils/constants.ts';

interface Props {
  handleChooseAmount: (amount: number) => void;
  activeAmount: number;
}

const buttonClass =
  'border border-solid border-[#24242A] hover:border-[#ffffff1A] cursor-pointer hover:text-white duration-300 ease-out bg-[#24242A] text-[14px] h-8 text-[#9798a2] font-bold flex rounded-lg items-center justify-center w-full';

function BetAmountControlsOptions({ handleChooseAmount, activeAmount }: Props) {
  return (
    <div className={'grid grid-cols-5 gap-1 items-center'}>
      {betAmountOptions.map((option) => {
        const isActive = activeAmount === option.value;
        return (
          <button
            type={'button'}
            onClick={() => {
              handleChooseAmount(option.value);
            }}
            className={`${buttonClass} ${isActive && 'border-[#ffffff1A] text-white '}`}
            key={option.value}
            style={{
              background: isActive
                ? 'radial-gradient(100% 100% at 50% 0%, #1B1B20 0%, #2F2F36 100%)'
                : '#24242A',
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default BetAmountControlsOptions;
