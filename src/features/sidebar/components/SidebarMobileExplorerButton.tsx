import Link from 'next/link';
import { SearchSidebarIcon } from '../icons';
import { usePathname } from 'next/navigation';

export const SidebarMobileExplorerButton = () => {
  const pathname = usePathname();

  return (
    <>
      <Link
        href='/explore'
        className='flex items-center justify-center md:hidden'
      >
        <SearchSidebarIcon isActive={pathname === '/explore'} />
      </Link>
    </>
  );
};
