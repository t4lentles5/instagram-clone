import { useRouter } from 'next/navigation';

import { ProfilePhoto } from '@/components/ui/ProfilePhoto';
import { LikeCommentButton } from './LikeCommentButton';

import { formatDate } from '@/utils/format-date';
import { getExactDate } from '@/utils/get-exact-date';

import { Comment } from '@/interfaces/post.interface';

interface Props {
  comment: Comment;
  userId: string;
}

export const CommentItem = ({ comment, userId }: Props) => {
  const router = useRouter();

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
              className='text-secondary text-xs'
              title={getExactDate(comment.createdAt.toString())}
            >
              {formatDate(comment.createdAt.toString())}
            </time>
          </div>
        </div>

        <LikeCommentButton comment={comment} userId={userId} />
      </div>
    </>
  );
};
