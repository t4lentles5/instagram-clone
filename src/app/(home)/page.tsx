import { getAuthenticatedUser } from '@/actions/auth/get-authenticate-user';
import { getRecommendedUsers } from '@/actions/user/get-recommended-users';
import { SwitchUser } from '@/components/home/SwitchUser';
import { Footer } from '@/components/ui/Footer';
import { SuggestedUsers } from '@/components/home/suggested-users/SuggestedUsers';
import { UserStories } from '@/components/home/user-stories/UserStories';

export default async function HomePage() {
  const user = await getAuthenticatedUser();
  const users = await getRecommendedUsers(user.id);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-[630px] flex-col items-center pt-4">
        <UserStories users={users} />
        {users.map((user) => (
          <div
            key={user.id}
            className="mx-auto w-full max-w-[470px] px-4 sm:px-0"
          >
            <div className="flex w-full items-center pb-[14px] pl-1">
              <div className="mr-3">
                <div className="h-8 w-8">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.profile_photo}
                    alt="profile photo"
                  />
                </div>
              </div>
              <div className="flex w-full items-baseline gap-x-1">
                <span className="text-sm leading-[18px]">{user.username}</span>

                <span className="flex items-center justify-center">•</span>

                <time
                  dateTime="2025-03-31T15:30:23.000Z"
                  className="text-foreground-secondary text-sm leading-[18px]"
                  title="Mar 31, 2025"
                >
                  1d
                </time>
              </div>

              <div className="flex w-8 justify-end">
                <svg
                  aria-label="More options"
                  fill="currentColor"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <title>More options</title>
                  <circle cx="12" cy="12" r="1.5"></circle>
                  <circle cx="6" cy="12" r="1.5"></circle>
                  <circle cx="18" cy="12" r="1.5"></circle>
                </svg>
              </div>
            </div>

            <div className="min-[485px]:border-border aspect-468/585 w-full min-[485px]:rounded-[4px] min-[485px]:border"></div>
          </div>
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
