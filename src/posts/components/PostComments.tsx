import { useRef, useEffect, RefObject, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

import { Comment } from '@/shared/interfaces/post.interface';

import { getExactDate } from '@/utils/get-exact-date';
import { formatDate } from '@/utils/format-date';

import { ProfilePhoto } from '@/shared/components/ProfilePhoto';
import { CommentItem } from '@/posts/components/CommentItem';

interface Props {
  comments: Comment[];
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  setReplyToCommentId: Dispatch<SetStateAction<string | null>>;
  postCaption: string | null | undefined;
  profile_photo: string | null;
  username: string;
  postCreatedAt: Date;
  showReplies: boolean;
  setShowReplies: Dispatch<SetStateAction<boolean>>;
}

export const PostComments = ({
  comments,
  textareaRef,
  setReplyToCommentId,
  postCaption,
  profile_photo,
  username,
  postCreatedAt,
  showReplies,
  setShowReplies,
}: Props) => {
  const router = useRouter();
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
      {comments.length > 0 || postCaption ? (
        <div className='border-post-separator scrollbar-hide grow overflow-y-scroll border-b p-4'>
          {postCaption && (
            <div className='mt-[-5px] flex grow items-center pt-3 pb-4'>
              <ProfilePhoto
                profile_photo={profile_photo}
                imageSize={{
                  size: 'w-8',
                }}
                backgroundDivSize={{
                  size: 'w-9',
                }}
                borderDivSize={{
                  size: 'w-10',
                }}
              />
              <div className='ml-[14px] flex max-w-[320px] flex-col'>
                <p className='text-sm leading-snug break-words whitespace-pre-wrap'>
                  <span
                    onClick={() => {
                      router.back();
                      setTimeout(() => {
                        router.push(`/${username}`);
                      }, 10);
                    }}
                    className='mr-1 font-semibold'
                  >
                    {username}
                  </span>
                  {postCaption}
                </p>

                <time
                  className='text-ig-secondary-text pr-3 text-xs'
                  title={getExactDate(postCreatedAt.toString())}
                >
                  {formatDate(postCreatedAt.toString())}
                </time>
              </div>
            </div>
          )}

          {comments.map((comment, index) => {
            const isNewest = index === 0;

            return (
              <div
                key={comment.id}
                ref={isNewest ? newestCommentRef : null}
                className={isNewest ? 'scroll-mt-4' : undefined}
              >
                <CommentItem
                  comment={comment}
                  textareaRef={textareaRef}
                  setReplyToCommentId={setReplyToCommentId}
                  showReplies={showReplies}
                  setShowReplies={setShowReplies}
                />
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
