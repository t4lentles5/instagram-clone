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
      <main className='flex flex-col items-center w-full h-full pb-0 mt-4 border-b md:pb-10 md:mt-0 border-separator'>
        <div className='flex w-full'>
          <ProfilePhoto user={user} />

          <div className='flex flex-col w-full h-full gap-3 ml-5 md:gap-5'>
            <div className='flex items-center justify-start w-full'>
              <h2 className='pr-5 overflow-hidden text-lg truncate max-w-48'>
                {user.username}
              </h2>
              <div className='hidden gap-2 md:flex'>
                <button className='text-sm button-primary'>Follow</button>

                <button className='text-sm button-secondary'>Message</button>

                <button className='px-2 font-semibold   rounded-lg text-foreground bg-buttonSecondary hover:bg-buttonSecondaryHover'>
                  <svg
                    aria-label='Similar accounts'
                    className='x1lliihq x1n2onr6 x5n08af'
                    fill='currentColor'
                    height='16'
                    role='img'
                    viewBox='0 0 24 24'
                    width='16'
                  >
                    <title>Similar accounts</title>
                    <path
                      d='M19.006 8.252a3.5 3.5 0 1 1-3.499-3.5 3.5 3.5 0 0 1 3.5 3.5Z'
                      fill='none'
                      stroke='currentColor'
                      strokeMiterlimit='10'
                      strokeWidth='2'
                    ></path>
                    <path
                      d='M22 19.5v-.447a4.05 4.05 0 0 0-4.05-4.049h-4.906a4.05 4.05 0 0 0-4.049 4.049v.447'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                    ></path>
                    <line
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeMiterlimit='10'
                      strokeWidth='2'
                      x1='5.001'
                      x2='5.001'
                      y1='7.998'
                      y2='14.003'
                    ></line>
                    <line
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeMiterlimit='10'
                      strokeWidth='2'
                      x1='8.004'
                      x2='2.003'
                      y1='11'
                      y2='11'
                    ></line>
                  </svg>
                </button>
              </div>

              <DotsThree size={32} weight='bold' className='m-2 text-text' />
            </div>
            <div className='flex gap-2 md:hidden'>
              <button className='text-sm button-primary'>Follow</button>

              <button className='text-sm button-secondary'>Message</button>

              <button className='px-2 font-semibold   rounded-lg text-foreground bg-buttonSecondary hover:bg-buttonSecondaryHover'>
                <svg
                  aria-label='Similar accounts'
                  className='x1lliihq x1n2onr6 x5n08af'
                  fill='currentColor'
                  height='16'
                  role='img'
                  viewBox='0 0 24 24'
                  width='16'
                >
                  <title>Similar accounts</title>
                  <path
                    d='M19.006 8.252a3.5 3.5 0 1 1-3.499-3.5 3.5 3.5 0 0 1 3.5 3.5Z'
                    fill='none'
                    stroke='currentColor'
                    strokeMiterlimit='10'
                    strokeWidth='2'
                  ></path>
                  <path
                    d='M22 19.5v-.447a4.05 4.05 0 0 0-4.05-4.049h-4.906a4.05 4.05 0 0 0-4.049 4.049v.447'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                  ></path>
                  <line
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeMiterlimit='10'
                    strokeWidth='2'
                    x1='5.001'
                    x2='5.001'
                    y1='7.998'
                    y2='14.003'
                  ></line>
                  <line
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeMiterlimit='10'
                    strokeWidth='2'
                    x1='8.004'
                    x2='2.003'
                    y1='11'
                    y2='11'
                  ></line>
                </svg>
              </button>
            </div>

            <div className='items-center justify-start hidden w-full md:flex md:gap-10'>
              <p className='font-bold text-center'>
                0{' '}
                <span className='font-normal text-foregroundSecondary'>
                  posts
                </span>
              </p>
              <button className='px-2 font-bold text-text'>
                0{' '}
                <span className='font-normal text-foregroundSecondary'>
                  followers
                </span>
              </button>
              <button className='px-2 font-bold text-text'>
                0{' '}
                <span className='font-normal text-foregroundSecondary'>
                  following
                </span>
              </button>
            </div>
            <div className='hidden md:block'>
              <h3 className='text-sm font-semibold'>{user.fullname}</h3>
              <span className='text-sm'>💙</span>
            </div>
          </div>
        </div>

        <div className='flex flex-col justify-start w-full p-4 md:hidden'>
          <h3 className='text-sm font-semibold'>{user.fullname}</h3>
          <span className='text-sm'>💙</span>
        </div>
      </main>
    </>
  );
};
