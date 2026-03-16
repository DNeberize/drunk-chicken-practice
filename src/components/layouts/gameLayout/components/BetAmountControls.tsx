import { useState } from 'react';
import BetAmountControlsOptions from '@/components/layouts/gameLayout/components/BetAmountControlsOptions.tsx';
import BetAmountInput from '@/components/layouts/gameLayout/components/BetAmountInput.tsx';

function BetAmountControls() {
  const [amount, setAmount] = useState<number>(0.5);
  return (
    <div className='bg-[#131316] h-full rounded-[20px] p-3 flex flex-col gap-2'>
      <BetAmountInput handleChangeAmount={(val) => setAmount(val)} amount={amount} />
      <BetAmountControlsOptions
        activeAmount={amount}
        handleChooseAmount={(val) => setAmount(val)}
      />
    </div>
  );
}

export default BetAmountControls;
