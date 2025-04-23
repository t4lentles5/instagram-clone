import { useRouter } from 'next/navigation';

import { ProfilePhoto } from '@/components/ui/ProfilePhoto';
import { LikeCommentButton } from './LikeCommentButton';

import { formatDate } from '@/utils/format-date';
import { getExactDate } from '@/utils/get-exact-date';

import { Comment } from '@/interfaces/post.interface';
import { useState } from 'react';
import { LikesModal } from '@/features/home/post/components/LikesModal';

interface Props {
  comment: Comment;
}

export const CommentItem = ({ comment }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div key={comment.id} className='flex items-start justify-between pt-3'>
        <div className='flex w-full'>
          <div className='w-[50px] shrink-0'>
            <ProfilePhoto
              profile_photo={comment.user.profile_photo}
              imageSize={{ size: 'w-8' }}
              backgroundDivSize={{ size: 'w-9' }}
              borderDivSize={{ size: 'w-10' }}
            />
          </div>

          <div className='max-w-[320px]'>
            <p className='text-sm leading-snug break-words whitespace-pre-wrap'>
              <span
                onClick={() => {
                  router.back();
                  setTimeout(() => {
                    router.push(`/${comment.user.username}`);
                  }, 10);
                }}
                className='mr-1 font-semibold'
              >
                {comment.user.username}
              </span>
              {comment.text}
            </p>

            <time
              className='text-secondary pr-3 text-xs'
              title={getExactDate(comment.createdAt.toString())}
            >
              {formatDate(comment.createdAt.toString())}
            </time>

            {comment.commentLike.length > 0 && (
              <button
                className='text-secondary cursor-pointer text-xs font-semibold'
                onClick={() => setIsOpen(true)}
              >
                {comment.commentLike.length}{' '}
                {comment.commentLike.length > 1 ? 'likes' : 'like'}
              </button>
            )}

            {isOpen && (
              <LikesModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                likes={comment.commentLike}
              />
            )}
          </div>
        </div>

        <LikeCommentButton comment={comment} />
      </div>
    </>
  );
};
