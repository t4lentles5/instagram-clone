import { getAuthenticatedUser } from '@/actions/auth/get-authenticate-user';
import { getUserByUsername } from '@/actions/user/get-user-by-username';
import { Footer } from '@/components/ui/Footer';
import { HeaderPageMobile } from '@/components/ui/HeaderPageMobile';
import { UserInfo } from '@/components/user/UserInfo';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const authenticatedUser = await getAuthenticatedUser();
  const userByUsername = await getUserByUsername(username);

  const user =
    userByUsername.username === authenticatedUser.username
      ? authenticatedUser
      : userByUsername;

  return {
    title: `${user.fullname} (@${user.username}) / Instagram`,
    description: `${user.fullname} (@${user.username}) / Instagram`,
  };
}

interface Props {
  params: Promise<{ username: string }>;
}

export default async function ProfileUserPage({ params }: Props) {
  const { username } = await params;

  const authenticatedUser = await getAuthenticatedUser();
  const userByUsername = await getUserByUsername(username);

  if (!userByUsername) {
    notFound();
  }

  const isOwnProfile = userByUsername.username === authenticatedUser.username;

  return (
    <>
      <div className='flex flex-col items-center justify-center w-full sm:pt-8 sm:px-10'>
        <HeaderPageMobile>
          {isOwnProfile ? authenticatedUser.fullname : userByUsername.fullname}
        </HeaderPageMobile>
        <UserInfo user={isOwnProfile ? authenticatedUser : userByUsername} />

        <div className='flex items-center justify-center w-full gap-16'>
          <Link
            className='flex items-center gap-2 py-4 border-t border-foreground'
            href={'/'}
          >
            <svg
              aria-label=''
              className='x1lliihq x1n2onr6 x5n08af'
              fill='currentColor'
              height='12'
              role='img'
              viewBox='0 0 24 24'
              width='12'
            >
              <title></title>
              <rect
                fill='none'
                height='18'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                width='18'
                x='3'
                y='3'
              ></rect>
              <line
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                x1='9.015'
                x2='9.015'
                y1='3'
                y2='21'
              ></line>
              <line
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                x1='14.985'
                x2='14.985'
                y1='3'
                y2='21'
              ></line>
              <line
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                x1='21'
                x2='3'
                y1='9.015'
                y2='9.015'
              ></line>
              <line
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                x1='21'
                x2='3'
                y1='14.985'
                y2='14.985'
              ></line>
            </svg>
            <span className='text-xs font-semibold uppercase'>Posts</span>
          </Link>

          <Link
            className='flex items-center gap-2 py-4 border-t border-foreground'
            href={'/reels'}
          >
            <svg
              aria-label=''
              className='x1lliihq x1n2onr6 x1roi4f4'
              fill='currentColor'
              height='12'
              role='img'
              viewBox='0 0 24 24'
              width='12'
            >
              <title></title>
              <line
                fill='none'
                stroke='currentColor'
                strokeLinejoin='round'
                strokeWidth='2'
                x1='2.049'
                x2='21.95'
                y1='7.002'
                y2='7.002'
              ></line>
              <line
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                x1='13.504'
                x2='16.362'
                y1='2.001'
                y2='7.002'
              ></line>
              <line
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                x1='7.207'
                x2='10.002'
                y1='2.11'
                y2='7.002'
              ></line>
              <path
                d='M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
              ></path>
              <path
                d='M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z'
                fillRule='evenodd'
              ></path>
            </svg>
            <span className='text-xs font-semibold uppercase'>Reels</span>
          </Link>

          <Link
            className='flex items-center gap-2 py-4 border-t border-foreground'
            href={'/tagged'}
          >
            <svg
              aria-label=''
              className='x1lliihq x1n2onr6 x1roi4f4'
              fill='currentColor'
              height='12'
              role='img'
              viewBox='0 0 24 24'
              width='12'
            >
              <title></title>
              <path
                d='M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
              ></path>
              <path
                d='M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
              ></path>
              <circle
                cx='12.072'
                cy='11.075'
                fill='none'
                r='3.556'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
              ></circle>
            </svg>
            <span className='text-xs font-semibold uppercase'>Tagged</span>
          </Link>
        </div>

        <div className='grid w-full grid-cols-3 gap-1'>
          <div className='bg-purple-500 h-[410px]'>1</div>
          <div className='bg-purple-500 h-[410px]'>1</div>
          <div className='bg-purple-500 h-[410px]'>1</div>
          <div className='bg-purple-500 h-[410px]'>1</div>
          <div className='bg-purple-500 h-[410px]'>1</div>
        </div>

        <div className='flex flex-col items-center justify-center w-full h-full gap-5'>
          <svg
            aria-label='Camera'
            fill='currentColor'
            height='62'
            role='img'
            viewBox='0 0 96 96'
            width='62'
            className='text-text'
          >
            <title>Camera</title>
            <circle
              cx='48'
              cy='48'
              fill='none'
              r='47'
              stroke='currentColor'
              strokeMiterlimit='10'
              strokeWidth='2'
            ></circle>
            <ellipse
              cx='48.002'
              cy='49.524'
              fill='none'
              rx='10.444'
              ry='10.476'
              stroke='currentColor'
              strokeLinejoin='round'
              strokeWidth='2.095'
            ></ellipse>
            <path
              d='M63.994 69A8.02 8.02 0 0 0 72 60.968V39.456a8.023 8.023 0 0 0-8.01-8.035h-1.749a4.953 4.953 0 0 1-4.591-3.242C56.61 25.696 54.859 25 52.469 25h-8.983c-2.39 0-4.141.695-5.181 3.178a4.954 4.954 0 0 1-4.592 3.242H32.01a8.024 8.024 0 0 0-8.012 8.035v21.512A8.02 8.02 0 0 0 32.007 69Z'
              fill='none'
              stroke='currentColor'
              strokeLinejoin='round'
              strokeWidth='2'
            ></path>
          </svg>

          <p className='mt-4 text-3xl font-bold text-center text-text'>
            {isOwnProfile ? 'Share Photos' : 'No posts yet!'}
          </p>
          {isOwnProfile && (
            <>
              <p className='text-sm font-normal text-text'>
                When you share photos, they will appear on your profile.
              </p>
              <button className='text-sm font-normal text-primary'>
                Share your first photo
              </button>
            </>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
