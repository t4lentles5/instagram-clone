import Link from 'next/link';

import { HeartIcon, CommentIcon } from '@/core/shared/icons';
import { CarouselProfilePostIcon } from '@/features/profile/icons/CarouselProfilePostIcon';

import { Aspect_ratio } from '@prisma/client';

interface Props {
  post: {
    id: string;
    aspect_ratio: Aspect_ratio;
    first_image_dimensions: string | null;
    postImages: {
      imageUrl: string;
    }[];
    _count: {
      likes: number;
      comments: number;
    };
  };
}

export const ExplorePostCard = ({ post }: Props) => {
  if (!post.first_image_dimensions) {
    return null;
  }

  const [width, height] = post.first_image_dimensions.split('/').map(Number);

  const isVertical = height > width + 120;

  const aspectRatio = isVertical ? 1 / 2 : 1 / 1;

  return (
    <>
      <Link
        href={`/p/${post.id}`}
        key={post.id}
        className='group relative flex items-center justify-center overflow-hidden'
        style={{
          maxWidth: '310px',
        }}
      >
        <img
          src={post.postImages[0].imageUrl}
          alt=''
          className={`${isVertical ? 'object-contain' : 'object-cover'} `}
          style={{
            aspectRatio: aspectRatio,
          }}
        />

        {post.postImages.length > 1 && (
          <div className='text-web-always-white absolute top-2 right-2'>
            <CarouselProfilePostIcon />
          </div>
        )}

        <div className='bg-ig-image-overlay active:bg-ig-image-overlay-pressed invisible absolute top-0 left-0 h-full w-full opacity-0 group-hover:visible group-hover:opacity-100'>
          <div className='text-web-always-white active:text-web-always-white/70 flex h-full items-center justify-center gap-8'>
            <span className='flex items-center justify-center'>
              <span className='mt-0.5 mr-[7px]'>
                <HeartIcon type={'likes'} size={19} />
              </span>
              <span className='text-base leading-5 font-bold'>
                {post._count.likes}
              </span>
            </span>

            <span className='flex items-center justify-center'>
              <span className='mt-0.5 mr-[7px]'>
                <CommentIcon type={'comments'} size={19} />
              </span>
              <span className='text-base leading-5 font-bold'>
                {post._count.comments}
              </span>
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};
