import { forwardRef, useImperativeHandle, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { createCommentPost } from '@/actions/post/comment/create-comment-post';

interface Props {
  userId: string;
  postId: string;
}

interface CommentFormInputs {
  text: string;
}

export const CommentForm = forwardRef<HTMLTextAreaElement, Props>(
  ({ userId, postId }, ref) => {
    const {
      register,
      handleSubmit,
      formState: { isValid },
      reset,
    } = useForm<CommentFormInputs>();

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => textareaRef.current!, []);

    const onSubmit: SubmitHandler<CommentFormInputs> = async (data) => {
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex grow items-center'
      >
        <textarea
          placeholder='Add a comment...'
          rows={1}
          className='max-h-[80px] min-h-[18px] w-full flex-1 resize-none overflow-y-auto border-none bg-transparent text-sm outline-none placeholder:text-gray-400 focus:ring-0'
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
        <button
          type='submit'
          className='disabled:text-secondary text-blue hover:text-primary ml-2 cursor-pointer text-sm font-semibold'
          disabled={!isValid}
        >
          Post
        </button>
      </form>
    );
  },
);

CommentForm.displayName = 'CommentForm';
