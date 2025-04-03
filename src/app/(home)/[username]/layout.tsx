import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAuthenticatedUser } from '@/actions/auth/get-authenticate-user';
import { getUserByUsername } from '@/actions/user/get-user-by-username';
import { Footer } from '@/components/ui/Footer';
import { HeaderPageMobile } from '@/components/ui/HeaderPageMobile';
import { UserInfo } from '@/components/user/UserInfo';
import { UserNavigation } from '@/components/user/UserNavigation';
import { UserStats } from '@/components/user/UserStats';

export const revalidate = 3600;

interface Props {
  params: Promise<{ username: string }>;
}

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

type Params = Promise<{ username: string }>;

export default async function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { username } = await params;

  const [authenticatedUser, userByUsername] = await Promise.all([
    getAuthenticatedUser(),
    getUserByUsername(username),
  ]);

  if (!userByUsername) {
    notFound();
  }

  const isOwnProfile = userByUsername.username === authenticatedUser.username;

  return (
    <div className="flex w-full flex-col items-center justify-center pt-16 md:mt-8 md:pt-0 lg:mx-10 lg:max-w-[935px]">
      <HeaderPageMobile>
        {isOwnProfile ? authenticatedUser.username : userByUsername.username}
      </HeaderPageMobile>

      <UserInfo
        userByUsername={userByUsername}
        authenticatedUser={authenticatedUser}
      />

      <UserStats />

      <UserNavigation
        username={
          isOwnProfile ? authenticatedUser.username : userByUsername.username
        }
      />
      {children}
      <Footer />
    </div>
  );
}
