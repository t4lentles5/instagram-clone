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
        href={'/'}
      >
        <MagnifyingGlass
          size={29}
          weight={pathname === `/` ? 'fill' : 'regular'}
        />
        <span className={` ${pathname === `/` && 'font-bold'}`}>Search</span>
      </Link>

      <Link
        className='flex items-center justify-start gap-4 p-3 transition-all duration-300 rounded-lg hover:bg-hover'
        href={'/'}
      >
        <Compass size={29} weight={pathname === `/` ? 'fill' : 'regular'} />
        <span className={` ${pathname === `/` && 'font-bold'}`}>Explore</span>
      </Link>

      <Link
        className='flex items-center justify-start gap-4 p-3 transition-all duration-300 rounded-lg hover:bg-hover'
        href={'/'}
      >
        <MessengerLogo
          size={29}
          weight={pathname === `/` ? 'fill' : 'regular'}
        />
        <span className={` ${pathname === `/` && 'font-bold'}`}>Messages</span>
      </Link>

      <Link
        className='flex items-center justify-start gap-4 p-3 transition-all duration-300 rounded-lg hover:bg-hover'
        href={'/'}
      >
        <Heart size={29} weight={pathname === `/` ? 'fill' : 'regular'} />
        <span className={` ${pathname === `/` && 'font-bold'}`}>
          Notifications
        </span>
      </Link>

      <Link
        className='flex items-center justify-start gap-4 p-3 transition-all duration-300 rounded-lg hover:bg-hover'
        href={'/'}
      >
        <PlusCircle size={29} weight={pathname === `/` ? 'fill' : 'regular'} />
        <span className={` ${pathname === `/` && 'font-bold'}`}>Create</span>
      </Link>

      <Link
        className='flex items-center justify-start gap-4 p-3 transition-all duration-300 rounded-lg hover:bg-hover'
        href={'/'}
      >
        <User size={29} weight={pathname === `/` ? 'fill' : 'regular'} />
        <span className={` ${pathname === `/` && 'font-bold'}`}>Profile</span>
      </Link>
    </nav>
  );
};
