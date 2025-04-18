'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProfilePhoto } from '@/components/ui/ProfilePhoto';

import { XIcon } from '@/components/icons/XIcon';
import { MoreOptions24 } from '@/components/icons/MoreOptions24';

interface Props {
  post: {
    id: string;
    caption: string | null;
    createdAt: Date;
    author: {
      username: string;
      profile_photo: string | null;
    };
    PostImages: {
      imageUrl: string;
    }[];
  };
}

export const PostModal = ({ post }: Props) => {
  const router = useRouter();

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <>
      <div className='bg-background-overlay fixed inset-0 z-50 flex items-center justify-center'>
        <button
          onClick={() => router.back()}
          className='absolute top-[10px] right-[10px] cursor-pointer p-2'
        >
          <XIcon />
        </button>
        <div className='bg-background flex h-11/12 w-7/9 xl:w-9/10'>
          <div className='border-popover flex aspect-square max-h-full max-w-full items-center border-r'>
            <img
              src={post.PostImages[0].imageUrl}
              alt=''
              className='object-contain'
            />
          </div>

          <div className='h-full grow'>
            <div className='border-popover flex items-center justify-between rounded-sm border-b'>
              <div className='flex grow items-center py-[14px] pr-1 pl-4'>
                <ProfilePhoto
                  profile_photo={post.author.profile_photo}
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
                <span className='ml-[14px] text-sm font-semibold'>
                  {post.author.username}
                </span>
              </div>
              <div className='pr-2'>
                <div className='p-2'>
                  <MoreOptions24 />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
