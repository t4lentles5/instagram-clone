import { getAuthenticatedUser } from '@/actions/auth/get-authenticate-user';
import { getRecommendedUsers } from '@/actions/user/get-recommended-users';
import { SwitchUser } from '@/components/home/SwitchUser';
import { Footer } from '@/components/ui/Footer';
import { SuggestedUsers } from '../../components/home/suggested-users/SuggestedUsers';

export default async function HomePage() {
  const user = await getAuthenticatedUser();
  const users = await getRecommendedUsers(user.id);

  return (
    <div className='flex w-full h-full pt-6 justify-evenly'>
      <div className='w-[630px] bg-purple-500'>
        <div className='w-full'>uwu</div>
        <div></div>
      </div>

      <div className='hidden w-[340px] pl-16 pt-5 lg:block'>
        <SwitchUser user={user} />

        <SuggestedUsers users={users} />
        <Footer />
      </div>
    </div>
  );
}
