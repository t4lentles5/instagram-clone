import { Dispatch, RefObject, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

import { Comment } from '@/core/shared/interfaces/post.interface';

import { ProfilePhoto } from '@/core/shared/components/ProfilePhoto';
import { LikeCommentButton } from '@/features/posts/components/post/LikeCommentButton';
import { ReplyComment } from '@/features/posts/components/post/ReplyComment';

import { formatDate } from '@/features/posts/utils/format-date';
import { getExactDate } from '@/features/posts/utils/get-exact-date';
import { useModal } from '@/core/shared/hooks/useModal';
import { Modal } from '@/core/shared/components/Modal';
import { CommentLikesModalContent } from '../likes/CommentLikesModalContent';
import { useQuery } from '@tanstack/react-query';
import { getAuthenticatedUser } from '@/features/auth/actions/get-authenticated-user';

interface Props {
  comment: Comment;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  setReplyToCommentId: Dispatch<SetStateAction<string | null>>;
  showReplies: boolean;
  setShowReplies: Dispatch<SetStateAction<boolean>>;
}

export const CommentItem = ({
  comment,
  textareaRef,
  setReplyToCommentId,
  showReplies,
  setShowReplies,
}: Props) => {
  const router = useRouter();

  const { data: authenticatedUser } = useQuery({
    queryKey: ['authenticatedUser'],
    queryFn: () => getAuthenticatedUser(),
    staleTime: 1000 * 60 * 10,
  });

  const { isOpen, openModal, closeModal } = useModal();

  const replyComment = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const usernameTag = `@${comment.user.username} `;

    textarea.value = '';

    textarea.value = usernameTag;

    textarea.focus();
    setReplyToCommentId(comment.id);
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
  };

  if (!authenticatedUser) {
    return null;
  }

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

          <div className='max-w-[270px]'>
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
              className='text-ig-secondary-text pr-3 text-xs'
              title={getExactDate(comment.createdAt.toString())}
            >
              {formatDate(comment.createdAt.toString())}
            </time>

            {comment.commentLike.length > 0 && (
              <>
                <button
                  className='text-ig-secondary-text cursor-pointer pr-3 text-xs font-semibold'
                  onClick={() => openModal()}
                >
                  {comment.commentLike.length}{' '}
                  {comment.commentLike.length > 1 ? 'likes' : 'like'}
                </button>

                <Modal isOpen={isOpen} closeModal={closeModal}>
                  <CommentLikesModalContent
                    closeModal={closeModal}
                    likes={comment.commentLike}
                    authenticatedUserId={authenticatedUser.id}
                  />
                </Modal>
              </>
            )}

            <button
              className='text-ig-secondary-text cursor-pointer text-xs font-semibold'
              onClick={() => {
                replyComment();
              }}
            >
              Reply
            </button>
          </div>
        </div>

        <LikeCommentButton comment={comment} />
      </div>

      {comment.replies.length > 0 && (
        <div className='mt-4 ml-[54px]'>
          <button
            className='flex cursor-pointer items-center'
            onClick={() => {
              if (showReplies) {
                setShowReplies(false);
              } else {
                setShowReplies(true);
              }
            }}
          >
            <div className='border-ig-secondary-text mr-4 block h-0 w-6 border'></div>
            <span className='text-ig-secondary-text text-xs font-semibold'>
              {showReplies
                ? 'Hide replies'
                : `View replies (${comment.replies.length})`}
            </span>
          </button>

          {showReplies &&
            comment.replies.map((reply) => (
              <ReplyComment
                key={reply.id}
                reply={reply}
                textareaRef={textareaRef}
                setReplyToCommentId={setReplyToCommentId}
              />
            ))}
        </div>
      )}
    </>
  );
};
