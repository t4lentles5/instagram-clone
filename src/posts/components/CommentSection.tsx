import { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { createCommentPost } from '@/actions/post/comment/create-comment-post';

import { EmojiIcon } from '@/shared/icons';

interface Props {
  postId: string;
  userId: string;
}

interface CommentInput {
  text: string;
}

export const CommentSection = ({ postId, userId }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<CommentInput>();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit: SubmitHandler<CommentInput> = async (data) => {
    const { text } = data;

    await createCommentPost(text, postId, userId);

    reset();

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.overflowY = 'hidden';
      textareaRef.current.style.height = '18px';
    }
  };

  return (
    <>
      <section className='mt-2 hidden w-full items-center justify-between min-[480px]:flex'>
        <button
          type='button'
          className='text-ig-secondary-text hover:text-ig-tertiary-text active:text-ig-secondary-text-pressed order-2 cursor-pointer p-1'
          aria-label='Add emoji'
        >
          <EmojiIcon size={13} />
        </button>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-1 items-center'
        >
          <textarea
            id='comment'
            placeholder='Add a comment...'
            rows={1}
            className='400 max-h-[120px] min-h-[18px] w-full flex-1 resize-none overflow-y-auto border-none bg-transparent text-sm outline-none focus:ring-0'
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = 'auto';
              el.style.height = `${Math.min(el.scrollHeight, 80)}px`;
              el.style.overflowY = el.scrollHeight > 80 ? 'auto' : 'hidden';
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }
            }}
            {...register('text', {
              required: true,
              validate: (value) => value.trim().length > 0,
            })}
            ref={(e) => {
              textareaRef.current = e;
              register('text').ref(e);
            }}
          />

          {isValid && (
            <button
              type='submit'
              className='text-ig-primary-button hover:text-ig-link active:text-ig-primary-button-pressed mx-2 cursor-pointer text-sm font-semibold'
            >
              Post
            </button>
          )}
        </form>
      </section>
    </>
  );
};
