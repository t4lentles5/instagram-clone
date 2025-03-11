import Link from 'next/link';

export const Footer = () => {
  return (
    <>
      <footer className='text-center text-[#a8a8a8] text-sm p-5'>
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
