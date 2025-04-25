import { ProfilePhoto } from '@/components/ui/ProfilePhoto';
import { LikesModal } from '@/features/home/post/components/LikesModal';
import { Reply } from '@/interfaces/post.interface';
import { formatDate } from '@/utils/format-date';
import { getExactDate } from '@/utils/get-exact-date';
import { useRouter } from 'next/navigation';
import { Dispatch, RefObject, SetStateAction, useState } from 'react';
import { LikeCommentButton } from './LikeCommentButton';

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
  const [isOpen, setIsOpen] = useState(false);

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

          <div className='max-w-[320px]'>
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
              className='text-secondary pr-3 text-xs'
              title={getExactDate(reply.createdAt.toString())}
            >
              {formatDate(reply.createdAt.toString())}
            </time>

            {reply.commentLike.length > 0 && (
              <>
                <button
                  className='text-secondary cursor-pointer pr-3 text-xs font-semibold'
                  onClick={() => setIsOpen(true)}
                >
                  {reply.commentLike.length}{' '}
                  {reply.commentLike.length > 1 ? 'likes' : 'like'}
                </button>

                {isOpen && (
                  <LikesModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    likes={reply.commentLike}
                  />
                )}
              </>
            )}

            <button
              className='text-secondary cursor-pointer text-xs font-semibold'
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
