import Link from 'next/link';

export const Footer = () => {
  return (
    <>
      <footer className='text-ig-tertiary-text p-5 text-center text-xs'>
        Cloned with 💜 by{' '}
        <Link
          href='https://github.com/Obrn544'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:underline'
        >
          @obrn544
        </Link>
      </footer>
    </>
  );
};
