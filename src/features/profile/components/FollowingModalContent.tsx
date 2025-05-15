import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

import { ProfilePhoto } from '@/core/shared/components/ProfilePhoto';
import { FollowUnfollowButton } from '@/core/shared/components/FollowUnfollowButton';
import { XIcon } from '@/core/shared/icons';

import { getFollowingByUsername } from '../actions/get-following-by-username';

interface Props {
  closeModal: () => void;
  username: string;
  authenticatedUserId: string;
}

export const FollowingModalContent = ({
  closeModal,
  username,
  authenticatedUserId,
}: Props) => {
  const { data: following, isLoading } = useQuery({
    queryKey: ['following', username],
    queryFn: () => getFollowingByUsername(username),
  });

  return (
    <>
      <div className='w-[400px]'>
        <div className='border-ig-elevated-separator flex h-[43px] border-b'>
          <div className='w-12'></div>
          <h2 className='grid grow place-items-center font-semibold'>
            Followers
          </h2>
          <button
            onClick={() => closeModal()}
            className='grid w-12 cursor-pointer place-items-center'
          >
            <XIcon />
          </button>
        </div>
        <div className='h-[356px] overflow-y-auto'>
          {isLoading ? (
            <div className='flex flex-col gap-2'>
              {Array.from({ length: 8 }).map((_, index) => (
                <section key={index} className='flex animate-pulse px-4 py-2'>
                  <div className='bg-ig-secondary-background h-11 w-11 rounded-full' />

                  <div className='flex flex-col gap-3'>
                    <div className='bg-ig-secondary-background h-4 w-[50px] rounded-lg' />
                    <div className='bg-ig-secondary-background h-4 w-[100px] rounded-lg' />
                  </div>
                </section>
              ))}
            </div>
          ) : following ? (
            following.map((following) => (
              <section
                className='flex justify-between px-4 py-2'
                key={following.id}
              >
                <div className='flex gap-3'>
                  <Link href={`/${following.username}`}>
                    <ProfilePhoto
                      profile_photo={following.profile_photo}
                      imageSize={{ size: 'w-11' }}
                      backgroundDivSize={{ size: 'w-[48px]' }}
                      borderDivSize={{ size: 'w-[52px]' }}
                    />
                  </Link>
                  <div className='flex flex-col justify-center'>
                    <Link
                      href={`/${following.username}`}
                      className='max-w-36 truncate overflow-hidden text-sm leading-[18px] font-semibold'
                    >
                      {following.username}
                    </Link>
                    <span className='text-ig-secondary-text text-xs'>
                      {following.fullname}
                    </span>
                  </div>
                </div>

                {following.id !== authenticatedUserId && (
                  <FollowUnfollowButton userId={following.id} inModal={true} />
                )}
              </section>
            ))
          ) : (
            <div>No followers found</div>
          )}
        </div>
      </div>
    </>
  );
};
