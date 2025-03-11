import Link from 'next/link';

export const Footer = () => {
  return (
    <>
      <footer className='p-5 text-sm text-center text-foregroundSecondary'>
        Cloned with 💙 by{' '}
        <Link
          href='https://github.com/Obrn544'
          target='_blank'
          rel='noopener noreferrer'
          className='text-buttonColor'
        >
          @obrn544
        </Link>
      </footer>
    </>
  );
};
