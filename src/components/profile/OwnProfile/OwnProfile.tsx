import { HeaderPageMobile } from '@/components/ui/HeaderPageMobile';
import { User } from '@/interfaces/user.interface';
import { OwnUserProfileInfo } from './OwnUserProfileInfo';
import { UserStats } from '../UserStats';
import { OwnProfileNavigation } from './OwnProfileNavigation';

interface Props {
  user: User;
}

export const OwnProfile = ({ user }: Props) => {
  return (
    <>
      <HeaderPageMobile>{user.username}</HeaderPageMobile>

      <OwnUserProfileInfo user={user} />

      <UserStats />

      <OwnProfileNavigation username={user.username} />
    </>
  );
};
