import { useRef, useEffect } from 'react';
import { Post } from '@/interfaces/post.interface';
import { CommentItem } from './CommentItem';

interface Props {
  comments: Post['comments'];
}

export const PostComments = ({ comments }: Props) => {
  const newestCommentRef = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) {
      if (newestCommentRef.current) {
        newestCommentRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    } else {
      hasMounted.current = true;
    }
  }, [comments.length]);

  return (
    <>
      {comments.length > 0 ? (
        <div className='border-popover scrollbar-hide grow overflow-y-scroll border-b p-4'>
          {comments.map((comment, index) => {
            const isNewest = index === 0;

            return (
              <div
                key={comment.id}
                ref={isNewest ? newestCommentRef : null}
                className={isNewest ? 'scroll-mt-4' : undefined}
              >
                <CommentItem comment={comment} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className='border-popover flex grow flex-col items-center justify-center border-b'>
          <h2 className='mb-2 text-2xl font-bold'>No comments yet.</h2>
          <span className='text-sm'>Start the conversation.</span>
        </div>
      )}
    </>
  );
};
