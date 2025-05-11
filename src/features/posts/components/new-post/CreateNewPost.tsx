import { EmojiIcon } from '@/core/shared/icons';
import { useUserStore } from '@/core/store/user/user-store';
import { useForm } from 'react-hook-form';
import { AddCollaboratorsIcon, DownChevronIcon } from '../../icons';

interface PostCaption {
  caption: string;
}

export const CreateNewPost = () => {
  const { authenticatedUser } = useUserStore();

  const { register, watch } = useForm<PostCaption>();

  const max = 2200;
  const caption = watch('caption') ?? '';
  const count = caption.length;

  return (
    <article className='bg-ig-elevated-background text-ig-primary-text border-ig-elevated-separator flex h-[516px] w-[340px] flex-col overflow-auto border-l px-4'>
      <section className='mt-[18px] mb-[14px] flex'>
        <img
          src={authenticatedUser.profile_photo || '/default_photo.jpg'}
          alt='Profile photo'
          className='w-7 rounded-full'
        />
        <span className='ml-3 font-semibold'>{authenticatedUser.username}</span>
      </section>

      <textarea
        id='comment'
        placeholder='Add a comment...'
        rows={1}
        className='400 max-h-[168px] min-h-[168px] w-full flex-1 resize-none overflow-y-auto border-none bg-transparent outline-none focus:ring-0'
        onInput={(e) => {
          const el = e.currentTarget;
          el.style.height = 'auto';
          el.style.height = `${Math.min(el.scrollHeight, 80)}px`;
          el.style.overflowY = el.scrollHeight > 80 ? 'auto' : 'hidden';
        }}
        {...register('caption', {
          validate: (value) => value.trim().length > 0,
        })}
        maxLength={max}
      />

      <section className='text-ig-secondary-text mt-[14px] mb-[14px] flex items-center justify-between'>
        <span className='cursor-pointer'>
          <EmojiIcon size={20} />
        </span>
        <span className='text-xs'>
          {count}/{max}
        </span>
      </section>

      <hr className='border-ig-separator w-full border-t' />

      <section>
        <div className='flex h-11 items-center justify-between'>
          <input
            type='text'
            placeholder='Add collaborators'
            className='border-none bg-transparent outline-none focus:ring-0'
          />

          <AddCollaboratorsIcon />
        </div>
        <div className='flex h-11 cursor-pointer items-center justify-between'>
          <span>Advanced Settings</span>
          <DownChevronIcon />
        </div>
        <hr className='border-ig-separator w-full border-t' />
      </section>
    </article>
  );
};
