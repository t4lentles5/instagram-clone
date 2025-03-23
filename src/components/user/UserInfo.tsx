'use client';

import { User } from '@/interfaces/user.interface';
import { ProfilePhoto } from './ProfilePhoto';
import { DotsThree } from 'phosphor-react';

interface Props {
  user: User;
}

export const UserInfo = ({ user }: Props) => {
  return (
    <>
      <main className='flex items-center w-full border-b pb-10 lg:w-[935px] border-separator'>
        <ProfilePhoto user={user} />

        <div className='flex flex-col w-full h-full gap-5 ml-5'>
          <div className='flex items-center justify-start w-full'>
            <h2 className='pr-5 text-xl'>{user.username}</h2>
            <button className='text-sm font-normal button-with-bg'>
              Follow
            </button>
            <DotsThree size={32} weight='bold' className='m-2 text-text' />
          </div>
          <div className='items-center justify-start hidden w-full sm:flex md:gap-10'>
            <p className='font-bold text-center'>
              0{' '}
              <span className='font-light text-foregroundSecondary'>posts</span>
            </p>
            <button className='px-2 font-bold text-text'>
              0{' '}
              <span className='font-light text-foregroundSecondary'>
                followers
              </span>
            </button>
            <button className='px-2 font-bold text-text'>
              0{' '}
              <span className='font-light text-foregroundSecondary'>
                following
              </span>
            </button>
          </div>
          <div>
            <h3 className='text-sm font-bold'>{user.fullname}</h3>
            <span className='text-sm'>💙</span>
          </div>
        </div>
      </main>
    </>
  );
};
