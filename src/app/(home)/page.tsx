import { getAuthenticatedUser } from '@/actions/auth/get-authenticated-user';
import { getRecommendedUsers } from '@/actions/user/get-recommended-users';
import { SwitchUser } from '@/features/home/suggested-users/components/SwitchUser';
import { Footer } from '@/components/layout/Footer';
import { SuggestedUsers } from '@/features/home/suggested-users/components/SuggestedUsers';
import { UserStories } from '@/features/home/user-stories/components/UserStories';
import { Post } from '@/features/home/post/components/Post';

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
