import { getAuthenticatedUser } from '@/actions/auth/get-authenticate-user';
import { getRecommendedUsers } from '@/actions/user/get-recommended-users';
import { SwitchUser } from '@/components/home/SwitchUser';
import { Footer } from '@/components/ui/Footer';
import { SuggestedUsers } from '../../components/home/suggested-users/SuggestedUsers';
import { UserStories } from '@/components/home/user-stories/UserStories';

export default async function HomePage() {
  const user = await getAuthenticatedUser();
  const users = await getRecommendedUsers(user.id);

  return (
    <div className='flex justify-center w-full h-full pt-6'>
      <div className='w-[630px]'>
        <UserStories users={users} />
        <div></div>
      </div>

      <div className='hidden w-[350px] pl-16 pt-5 lg:block'>
        <SwitchUser user={user} />

        <SuggestedUsers users={users} />

        <Footer />
      </div>
    </div>
  );
}
