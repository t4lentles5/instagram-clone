'use client';

import Link from 'next/link';
import { User } from '@/interfaces/user.interface';
import { OwnProfilePhoto } from '@/components/profile/OwnProfile/OwnProfilePhoto';
import { SimilarAccountsIcon } from '@/assets/profile/SimilarAccountsIcon';

interface Props {
  user: User;
}

export const OwnUserProfileInfo = ({ user }: Props) => {
  return (
    <>
      <main className="border-border mt-4 flex h-full w-full flex-col items-center border-b pb-0 md:mt-0 md:pb-10">
        <div className="flex w-full">
          <OwnProfilePhoto user={user} />

          <div className="ml-5 flex h-full w-full flex-col gap-3 md:gap-5">
            <div className="flex w-full items-center justify-start">
              <h2 className="max-w-48 truncate overflow-hidden pr-5 text-lg">
                {user.username}
              </h2>

              <div className="flex items-center justify-center gap-2">
                <Link
                  href={''}
                  className="text-primary rounded-lg px-4 py-[6px] font-semibold"
                >
                  Edit Profile
                </Link>

                <button>
                  <svg
                    aria-label="Options"
                    fill="currentColor"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <title>Options</title>
                    <circle
                      cx="12"
                      cy="12"
                      fill="none"
                      r="8.635"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></circle>
                    <path
                      d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096"
                      fill="none"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </button>
              </div>
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
