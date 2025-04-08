import { getAuthenticatedUser } from '@/actions/auth/get-authenticate-user';
import { getRecommendedUsers } from '@/actions/user/get-recommended-users';
import { SwitchUser } from '@/components/home/SwitchUser';
import { Footer } from '@/components/ui/Footer';
import { SuggestedUsers } from '@/components/home/suggested-users/SuggestedUsers';
import { UserStories } from '@/components/home/user-stories/UserStories';
import { Post } from '@/components/ui/Post';

export default async function HomePage() {
  const user = await getAuthenticatedUser();
  const users = await getRecommendedUsers(user.id);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-[630px] flex-col items-center pt-4">
        <UserStories usersStories={users} user={user} />
        {users.map((user) => (
          <Post user={user} key={user.id} />
        ))}
      </div>

      <div className="ml-16 hidden h-full w-[320px] flex-col justify-start pt-9 min-[1160px]:flex">
        <SwitchUser user={user} />

        <SuggestedUsers users={users} />

        <Footer />
      </div>
    </div>
  );
}
