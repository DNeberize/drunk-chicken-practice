function JumpControls() {
  return (
    <div className='bg-[#131316] h-full rounded-[20px] p-3 grid grid-cols-2 gap-3'>
      <button
        type={'button'}
        className={
          'flex flex-col cursor-pointer gap-[2px] items-center justify-center border border-solid  rounded-xl border-white/40'
        }
        style={{
          background: 'radial-gradient(100% 100% at 50% 0%, #FF8800 0%, #FFBB00 100%)',
        }}
      >
        <p className={'text-white text-base font-semibold'}>Cashout</p>
        <p className={'text-white text-xl font-bold uppercase'}>4.00 USD</p>
      </button>
      <button
        type={'button'}
        className={
          'cursor-pointer flex flex-col items-center justify-center border border-solid  rounded-xl border-white/40'
        }
        style={{
          background: 'radial-gradient(100% 100% at 50% 0%, #068A2F 0%, #34D264 100%)',
        }}
      >
        <p className={'text-white text-xl font-bold'}>Jump</p>
      </button>
    </div>
  );
}

export default JumpControls;
