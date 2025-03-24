export const UserStats = () => {
  return (
    <>
      <div className='flex items-center w-full gap-10 p-3 border-b md:hidden justify-evenly border-separator'>
        <p className='font-bold text-center text-text'>
          0
          <span className='block font-normal text-foregroundSecondary'>
            posts
          </span>
        </p>
        <button className='font-bold text-text '>
          0{' '}
          <span className='block font-normal text-foregroundSecondary'>
            Followers
          </span>
        </button>
        <button className='font-bold text-text '>
          0{' '}
          <span className='block font-normal text-foregroundSecondary'>
            Following
          </span>
        </button>
      </div>
    </>
  );
};
