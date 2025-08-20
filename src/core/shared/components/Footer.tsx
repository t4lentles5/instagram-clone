import Link from 'next/link';

export const Footer = () => {
  return (
    <>
      <footer className='text-ig-tertiary-text p-5 text-center text-xs'>
        Cloned with 💜 by{' '}
        <Link
          href='https://github.com/t4lentles5'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:underline'
        >
          @t4lentles5
        </Link>
      </footer>
    </>
  );
};
