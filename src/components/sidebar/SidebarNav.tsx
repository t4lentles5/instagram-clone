'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Heart,
  House,
  MagnifyingGlass,
  MessengerLogo,
  PlusCircle,
  User,
} from 'phosphor-react';

export const SidebarNav = () => {
  const pathname = usePathname();

  return (
    <nav className='flex flex-col gap-1'>
      <Link
        className='flex items-center justify-start gap-4 p-3 transition-all duration-300 rounded-lg hover:bg-hover'
        href={'/'}
      >
        <House size={29} weight={pathname === `/` ? 'fill' : 'regular'} />
        <span className={` ${pathname === `/` && 'font-bold'}`}>Home</span>
      </Link>

      <Link
        className='flex items-center justify-start gap-4 p-3 transition-all duration-300 rounded-lg hover:bg-hover'
        href={'/search'}
      >
        <MagnifyingGlass
          size={29}
          weight={pathname === `/search` ? 'bold' : 'regular'}
        />
        <span className={` ${pathname === `/search` && 'font-bold'}`}>
          Search
        </span>
      </Link>

      <Link
        className='flex items-center justify-start gap-4 p-3 transition-all duration-300 rounded-lg hover:bg-hover'
        href={'/explore'}
      >
        <Compass
          size={29}
          weight={pathname === `/explore` ? 'fill' : 'regular'}
        />
        <span className={` ${pathname === `/explore` && 'font-bold'}`}>
          Explore
        </span>
      </Link>

      <Link
        className='flex items-center justify-start gap-4 p-3 transition-all duration-300 rounded-lg hover:bg-hover'
        href={'/messages'}
      >
        <MessengerLogo
          size={29}
          weight={pathname === `/messages` ? 'fill' : 'regular'}
        />
        <span className={` ${pathname === `/messages` && 'font-bold'}`}>
          Messages
        </span>
      </Link>

      <Link
        className='flex items-center justify-start gap-4 p-3 transition-all duration-300 rounded-lg hover:bg-hover'
        href={'/notifications'}
      >
        <Heart
          size={29}
          weight={pathname === `/notifications` ? 'fill' : 'regular'}
        />
        <span className={` ${pathname === `/notifications` && 'font-bold'}`}>
          Notifications
        </span>
      </Link>

      <button className='flex items-center justify-start gap-4 p-3 transition-all duration-300 rounded-lg hover:bg-hover'>
        <PlusCircle size={29} weight={false ? 'fill' : 'regular'} />
        <span className={` ${false && 'font-bold'}`}>Create</span>
      </button>

      <Link
        className='flex items-center justify-start gap-4 p-3 transition-all duration-300 rounded-lg hover:bg-hover'
        href={'/omar1'}
      >
        <User size={29} weight={pathname === `/omar1` ? 'fill' : 'regular'} />
        <span className={` ${pathname === `/omar1` && 'font-bold'}`}>
          Profile
        </span>
      </Link>
    </nav>
  );
};
