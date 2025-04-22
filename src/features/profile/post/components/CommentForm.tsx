import { createCommentPost } from '@/actions/post/create-comment-post';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
  userId: string;
  postId: string;
}

interface CommentFormInputs {
  text: string;
}

export const CommentForm = ({ userId, postId }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<CommentFormInputs>();

  const onSubmit: SubmitHandler<CommentFormInputs> = async (data) => {
    const { text } = data;

    await createCommentPost(text, postId, userId);
    reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex grow items-center'
      >
        <textarea
          placeholder='Add a comment...'
          rows={1}
          className='max-h-[80px] min-h-[18px] w-full flex-1 resize-none overflow-y-auto border-none bg-transparent text-sm outline-none placeholder:text-gray-400 focus:ring-0'
          onInput={(e) => {
            e.currentTarget.style.height = 'auto';
            e.currentTarget.style.height = `${Math.min(e.currentTarget.scrollHeight, 80)}px`;
          }}
          {...register('text', { required: true })}
        />
        <button
          type='submit'
          className='disabled:text-secondary text-primary ml-2 text-sm font-semibold'
          disabled={!isValid}
        >
          Post
        </button>
      </form>
    </>
  );
};
