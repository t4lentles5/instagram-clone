import { FollowUnfollowButton } from '@/core/shared/components/FollowUnfollowButton';
import { ProfilePhoto } from '@/core/shared/components/ProfilePhoto';
import { XIcon } from '@/core/shared/icons';
import { Comment } from '@/core/shared/interfaces/post.interface';
import Link from 'next/link';

interface Props {
  closeModal: () => void;
  likes: Comment['commentLike'];
  authenticatedUserId: string;
}

export const CommentLikesModalContent = ({
  closeModal,
  likes,
  authenticatedUserId,
}: Props) => {
  return (
    <>
      <div className='w-[400px]'>
        <div className='border-ig-elevated-separator flex h-[43px] border-b'>
          <div className='w-12'></div>
          <h2 className='grid grow place-items-center font-semibold'>Likes</h2>
          <button
            onClick={() => closeModal()}
            className='grid w-12 cursor-pointer place-items-center'
          >
            <XIcon />
          </button>
        </div>
        <div className='h-[356px] overflow-y-auto'>
          {likes.map((like) => (
            <div key={like.id} className='flex w-full items-center px-4 py-2'>
              <ProfilePhoto
                profile_photo={like.user.profile_photo}
                imageSize={{
                  size: 'w-11',
                }}
                backgroundDivSize={{
                  size: 'w-12',
                }}
                borderDivSize={{
                  size: 'w-[52px]',
                }}
              />

              <div className='ml-3 flex grow flex-col text-sm'>
                <span>
                  <Link
                    className='max-w-36 truncate overflow-hidden font-semibold'
                    href={`${like.user.username}`}
                  >
                    {like.user.username}
                  </Link>
                </span>
                <span className='text-ig-secondary-text max-w-36 truncate overflow-hidden'>
                  {like.user.fullname}
                </span>
              </div>

              {like.user.id !== authenticatedUserId && (
                <FollowUnfollowButton userId={like.user.id} inModal={true} />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
