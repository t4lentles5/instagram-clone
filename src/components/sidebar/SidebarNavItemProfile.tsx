import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '@/interfaces/user.interface';
import { useSidebarStore } from '@/store/ui/sidebar-store';

interface Props {
  user: User;
}

export const SidebarNavItemProfile = ({ user }: Props) => {
  const pathname = usePathname();
  const { isSidebarCollapsed } = useSidebarStore();

  return (
    <>
      <div className="flex h-12 items-center justify-center md:h-14 md:w-full">
        <Link
          className="hover:bg-background-hover relative flex items-center justify-start gap-4 rounded-lg p-3 md:w-full"
          href={`/${user.username}`}
        >
          <div className="relative">
            {pathname === `/${user.username}` && (
              <div className="border-foreground absolute top-0 left-0 h-7 w-7 translate-x-[-2px] translate-y-[-2px] rounded-full border-2"></div>
            )}
            <img
              src={user.profile_photo || '/default_photo.jpg'}
              alt="user profile photo"
              className="h-6 w-6 rounded-full object-contain"
            />
          </div>
          <span
            className={`${
              isSidebarCollapsed ? 'hidden' : 'xl:block'
            } hidden leading-5 ${
              pathname === `/${user.username}` &&
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
