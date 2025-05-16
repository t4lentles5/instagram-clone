import { Dispatch, RefObject, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { getExactDate } from '@/features/posts/utils/get-exact-date';
import { formatDate } from '@/features/posts/utils/format-date';

import { LikeCommentButton } from '@/features/posts/components/post/LikeCommentButton';

import { Reply } from '@/core/shared/interfaces/post.interface';
import { ProfilePhoto } from '@/core/shared/components/ProfilePhoto';
import { useModal } from '@/core/shared/hooks/useModal';
import { Modal } from '@/core/shared/components/Modal';
import { CommentLikesModalContent } from '../likes/CommentLikesModalContent';
import { getAuthenticatedUser } from '@/features/auth/actions/get-authenticated-user';

interface Props {
  reply: Reply;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  setReplyToCommentId: Dispatch<SetStateAction<string | null>>;
}

export const ReplyComment = ({
  reply,
  textareaRef,
  setReplyToCommentId,
}: Props) => {
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();

  const { data: authenticatedUser } = useQuery({
    queryKey: ['authenticatedUser'],
    queryFn: () => getAuthenticatedUser(),
    staleTime: 1000 * 60 * 10,
  });

  if (!authenticatedUser) {
    return null;
  }

  const replyComment = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const usernameTag = `@${reply.user.username} `;

    textarea.value = '';

    textarea.value = usernameTag;

    textarea.focus();
    setReplyToCommentId(reply.parentId);
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
  };

  return (
    <>
      <div key={reply.id} className='flex items-start justify-between pt-3'>
        <div className='flex w-full'>
          <div className='w-[50px] shrink-0'>
            <ProfilePhoto
              profile_photo={reply.user.profile_photo}
              imageSize={{ size: 'w-8' }}
              backgroundDivSize={{ size: 'w-9' }}
              borderDivSize={{ size: 'w-10' }}
            />
          </div>

          <div className='max-w-[230px]'>
            <p className='text-sm leading-snug break-words whitespace-pre-wrap'>
              <span
                onClick={() => {
                  router.back();
                  setTimeout(() => {
                    router.push(`/${reply.user.username}`);
                  }, 10);
                }}
                className='mr-1 font-semibold'
              >
                {reply.user.username}
              </span>
              {reply.text}
            </p>

            <time
              className='text-ig-secondary-text pr-3 text-xs'
              title={getExactDate(reply.createdAt.toString())}
            >
              {formatDate(reply.createdAt.toString())}
            </time>

            {reply.commentLike.length > 0 && (
              <>
                <button
                  className='text-ig-secondary-text cursor-pointer pr-3 text-xs font-semibold'
                  onClick={() => openModal()}
                >
                  {reply.commentLike.length}{' '}
                  {reply.commentLike.length > 1 ? 'likes' : 'like'}
                </button>

                <Modal isOpen={isOpen} closeModal={closeModal}>
                  <CommentLikesModalContent
                    closeModal={closeModal}
                    likes={reply.commentLike}
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

        <LikeCommentButton comment={reply} />
      </div>
    </>
  );
};
