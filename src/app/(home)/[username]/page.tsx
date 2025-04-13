import { getPostsByUsername } from '@/actions/user/get-posts-by-username';
import { CameraIcon } from '@/features/profile/icons/CameraIcon';
import { CarouselIcon } from '@/features/profile/icons/CarouselIcon';
import { CommentsIcon } from '@/features/profile/icons/CommentsIcon';
import { LikesIcon } from '@/features/profile/icons/LikesIcon';
import Link from 'next/link';

interface Props {
  params: Promise<{ username: string }>;
}

export default async function ProfileUserPage({ params }: Props) {
  const { username } = await params;

  const posts = await getPostsByUsername(username);

  return (
    <>
      {posts.length ? (
        <div className="grid w-full grid-cols-3 gap-1">
          {posts.map((post) => (
            <Link
              href={`/${username}/p/${post.id}`}
              key={post.id}
              className="group relative"
            >
              <img
                src={post.PostImages[0].imageUrl}
                alt=""
                className="aspect-3/4 object-cover"
              />

              {post.PostImages.length > 1 && (
                <div className="absolute top-2 right-2">
                  <CarouselIcon />
                </div>
              )}

              <div className="bg-post-image-overlay invisible absolute top-0 left-0 h-full w-full opacity-0 group-hover:visible group-hover:opacity-100">
                <div className="flex h-full items-center justify-center gap-8">
                  <span className="flex items-center justify-center">
                    <span className="mt-0.5 mr-[7px]">
                      <LikesIcon />
                    </span>
                    <span className="text-base leading-5 font-bold">100</span>
                  </span>

                  <span className="flex items-center justify-center">
                    <span className="mt-0.5 mr-[7px]">
                      <CommentsIcon />
                    </span>
                    <span className="text-base leading-5 font-bold">10</span>
                  </span>
                </div>
              </div>
            </Link>
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
