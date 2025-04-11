import { getAuthenticatedUser } from '@/actions/auth/get-authenticated-user';
import { CameraIcon } from '@/features/profile/icons/CameraIcon';

interface Props {
  params: Promise<{ username: string }>;
}

export default async function ProfileUserPage({ params }: Props) {
  const user = await getAuthenticatedUser();

  return (
    <>
      {user.posts.length ? (
        <div className="grid w-full grid-cols-3 gap-1">
          {user.posts.map((post) => (
            <div key={post.id} className="">
              <img
                src={post.PostImages[0].imageUrl}
                alt=""
                className="aspect-3/4 object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-5">
          <CameraIcon />
          <p className="mt-4 text-center text-3xl font-bold">Share Photos</p>

          <p className="text-sm font-normal">
            When you share photos, they will appear on your profile.
          </p>
          <button className="text-blue text-sm font-normal">
            Share your first photo
          </button>
        </div>
      )}
    </>
  );
}
