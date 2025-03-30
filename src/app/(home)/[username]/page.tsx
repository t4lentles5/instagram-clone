import { getAuthenticatedUser } from '@/actions/auth/get-authenticate-user';
import { getUserByUsername } from '@/actions/user/get-user-by-username';
import { CameraIcon } from '@/assets/icons/CameraIcon';
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
    title: `${user.fullname} (@${user.username}) • Instagram`,
    description: `${user.fullname} (@${user.username}) • Instagram`,
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

  const isOwnProfile = userByUsername === authenticatedUser;

  return (
    <>
      <div className='flex flex-col items-center justify-center lg:max-w-[935px]  w-full md:mt-8 lg:mx-10'>
        <HeaderPageMobile>
          {isOwnProfile ? authenticatedUser.username : userByUsername.username}
        </HeaderPageMobile>

        <UserInfo
          userByUsername={userByUsername}
          authenticatedUser={authenticatedUser}
        />

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
          <CameraIcon />
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
