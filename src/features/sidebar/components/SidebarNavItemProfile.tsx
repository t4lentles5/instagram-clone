import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useSidebarStore } from '@/features/sidebar/sidebar-store';
import { useQuery } from '@tanstack/react-query';

import { getAuthenticatedUser } from '@/features/auth/actions/get-authenticated-user';

export const SidebarNavItemProfile = () => {
  const pathname = usePathname();
  const { isSidebarCollapsed } = useSidebarStore();

  const { data: authenticatedUser } = useQuery({
    queryKey: ['authenticatedUser'],
    queryFn: () => getAuthenticatedUser(),
    staleTime: 1000 * 60 * 10,
  });

  if (!authenticatedUser) {
    return null;
  }

  return (
    <>
      <div className='flex h-12 items-center justify-center md:h-14 md:w-full'>
        <Link
          className='hover:bg-ig-hover-overlay active:bg-ig-active-overlay active:text-ig-primary-text/50 flex cursor-pointer items-center justify-start gap-4 rounded-lg p-3 active:scale-95 md:w-full'
          href={`/${authenticatedUser.username}`}
        >
          <div className='relative'>
            {pathname.startsWith(`/${authenticatedUser.username}`) && (
              <div className='border-foreground absolute top-0 left-0 h-7 w-7 translate-x-[-2px] translate-y-[-2px] rounded-full border-2'></div>
            )}
            <img
              src={authenticatedUser.profile_photo || '/default_photo.jpg'}
              alt='user profile photo'
              className='h-6 w-6 rounded-full object-contain'
            />
          </div>
          <span
            className={`${
              isSidebarCollapsed ? 'hidden' : 'xl:block'
            } hidden leading-5 ${
              pathname.startsWith(`/${authenticatedUser.username}`) &&
              !isSidebarCollapsed &&
              'font-bold'
            }`}
          >
            Profile
          </span>
        </Link>
      </div>
    </>
  );
};
