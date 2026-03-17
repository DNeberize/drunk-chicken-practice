import { MinusIcon, PlusIcon } from '@/assets/svg/SvgToTsx.tsx';

interface Props {
  amount: number;
  handleChangeAmount: (amount: number) => void;
}
function BetAmountInput({ amount, handleChangeAmount }: Props) {
  return (
    <div className='border border-white/10 border-solid rounded-xl gap-3 px-3 h-10 flex justify-between items-center'>
      <button type={'button'} onClick={() => handleChangeAmount(+Number(amount - 0.1).toFixed(2))}>
        <MinusIcon className={'w-5 h-5 icon-white'} />
      </button>
      <input
        type='number'
        className={
          'text-white w-[calc(100%-64px)] text-[14px] font-bold text-center appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none outline-0'
        }
        value={amount}
        onChange={(e) => {
          handleChangeAmount(Number(e.target.value));
        }}
      />
      <button type={'button'} onClick={() => handleChangeAmount(+Number(amount + 0.1).toFixed(2))}>
        <PlusIcon className={'w-5 h-5 icon-white'} />
      </button>
    </div>
  );
}

export default BetAmountInput;
