import { getAuthenticatedUser } from '@/actions/auth/get-authenticated-user';
import { getUserByUsername } from '@/actions/user/get-user-by-username';

import { HeaderPageMobile } from '@/components/layout/HeaderPageMobile';
import { ProfileNavigation } from '@/features/profile/components/ProfileNavigation';
import { UserProfileInfo } from '@/features/profile/components/UserProfileInfo';

type Params = Promise<{ username: string }>;

export default async function RoutesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { username } = await params;
  const user = await getUserByUsername(username);
  const authenticatedUser = await getAuthenticatedUser();

  const isAuthenticatedUser = user.username === authenticatedUser.username;

  return (
    <>
      <HeaderPageMobile username={username} />
      <UserProfileInfo user={user} isAuthenticatedUser={isAuthenticatedUser} />
      <ProfileNavigation
        username={user.username}
        isAuthenticatedUser={isAuthenticatedUser}
      />
      {children}
    </>
  );
}
