import { getUserByUsername } from '@/actions/user/get-user-by-username';

import { HeaderPageMobile } from '@/components/layout/HeaderPageMobile';
import { ProfileNavigation } from '@/features/profile/components/ProfileNavigation';
import { UserProfileInfo } from '@/features/profile/components/UserProfileInfo';
import { UserStats } from '@/features/profile/components/UserStats';

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

  return (
    <>
      <HeaderPageMobile>{username}</HeaderPageMobile>
      <UserProfileInfo user={user} />
      <UserStats />
      <ProfileNavigation username={user.username} />
      {children}
    </>
  );
}
