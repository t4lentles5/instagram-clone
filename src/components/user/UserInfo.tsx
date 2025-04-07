'use client';

import Link from 'next/link';
import { User } from '@/interfaces/user.interface';
import { ProfilePhoto } from '@/components/user/ProfilePhoto';
import { OptionsIcon } from '@/assets/icons/OptionsIcon';
import { SimilarAccountsIcon } from '@/assets/icons/SimilarAccountsIcon';

interface Props {
  userByUsername: User;
  authenticatedUser: User;
}

export const UserInfo = ({ userByUsername, authenticatedUser }: Props) => {
  const isOwnProfile = userByUsername.username === authenticatedUser.username;
  const user = isOwnProfile ? authenticatedUser : userByUsername;

  return (
    <>
      <main className="border-border mt-4 flex h-full w-full flex-col items-center border-b pb-0 md:mt-0 md:pb-10">
        <div className="flex w-full">
          <ProfilePhoto user={user} />

          <div className="ml-5 flex h-full w-full flex-col gap-3 md:gap-5">
            <div className="flex w-full items-center justify-start">
              <h2 className="max-w-48 truncate overflow-hidden pr-5 text-lg">
                {user.username}
              </h2>

              {isOwnProfile ? (
                <div className="flex items-center justify-center gap-2">
                  <Link
                    href={''}
                    className="text-primary rounded-lg px-4 py-[6px] font-semibold"
                  >
                    Edit Profile
                  </Link>

                  <button>
                    <OptionsIcon isOwnProfile={isOwnProfile} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="hidden gap-2 md:flex">
                    <button className="rounded-lg px-4 py-[6px] text-sm font-semibold text-white">
                      Follow
                    </button>

                    <button className="text-primary rounded-lg px-4 py-[6px] text-sm font-semibold">
                      Message
                    </button>

                    <button className="text-primary rounded-lg px-2 font-semibold">
                      <SimilarAccountsIcon />
                    </button>
                  </div>

                  <OptionsIcon isOwnProfile={isOwnProfile} />
                </>
              )}
            </div>
            <div className="flex gap-2 md:hidden">
              <button className="rounded-lg px-4 py-[6px] text-sm font-semibold text-white">
                Follow
              </button>

              <button className="text-primary rounded-lg px-4 py-[6px] text-sm font-semibold">
                Message
              </button>

              <button className="text-primary rounded-lg px-2 font-semibold">
                <SimilarAccountsIcon />
              </button>
            </div>

            <div className="hidden w-full items-center justify-start md:flex md:gap-10">
              <p className="text-center font-bold">
                0 <span className="font-normal">posts</span>
              </p>
              <button className="px-2 font-bold">
                0 <span className="font-normal">followers</span>
              </button>
              <button className="px-2 font-bold">
                0 <span className="font-normal">following</span>
              </button>
            </div>
            <div className="hidden md:block">
              <h3 className="text-sm font-semibold">{user.fullname}</h3>
              <span className="text-sm">💜</span>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col justify-start p-4 md:hidden">
          <h3 className="text-sm font-semibold">{user.fullname}</h3>
          <span className="text-sm">💜</span>
        </div>
      </main>
    </>
  );
};
