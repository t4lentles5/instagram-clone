import { getAuthenticatedUser } from '@/actions/auth/get-authenticate-user';
import { getUserByUsername } from '@/actions/user/get-user-by-username';
import { Footer } from '@/components/ui/Footer';
import { HeaderPageMobile } from '@/components/ui/HeaderPageMobile';
import { UserInfo } from '@/components/user/UserInfo';
import { UserNavigation } from '@/components/user/UserNavigation';
import { UserStats } from '@/components/user/UserStats';
import { Metadata } from 'next';
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
      <div className='flex flex-col items-center justify-center lg:max-w-[935px]  w-full md:mt-8 lg:mx-10'>
        <HeaderPageMobile>
          {isOwnProfile ? authenticatedUser.username : userByUsername.username}
        </HeaderPageMobile>

        <UserInfo user={isOwnProfile ? authenticatedUser : userByUsername} />

        <UserStats />

        <UserNavigation />

        <div className='grid w-full grid-cols-3 gap-1'>
          <div className='bg-purple-500 aspect-[3/4]'>1</div>
          <div className='bg-purple-500 aspect-[3/4]'>1</div>
          <div className='bg-purple-500 aspect-[3/4]'>1</div>
          <div className='bg-purple-500 aspect-[3/4]'>1</div>
          <div className='bg-purple-500 aspect-[3/4]'>1</div>
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
