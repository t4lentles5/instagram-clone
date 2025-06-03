import Link from 'next/link';

import { HeartIcon, CommentIcon } from '@/core/shared/icons';
import { CarouselProfilePostIcon } from '@/features/profile/icons/CarouselProfilePostIcon';
import { Footer } from '@/core/shared/components/Footer';

interface Props {
  posts: {
    id: string;
    postImages: {
      imageUrl: string;
    }[];
    _count: {
      likes: number;
      comments: number;
    };
  }[];
}

export const MasonryLayout = ({ posts }: Props) => {
  const getBlocks = () => {
    const blocks = [];
    let i = 0;
    let flip = false;

    while (i + 5 <= posts.length) {
      const group = posts.slice(i, i + 5);

      const squares = [group[0], group[1], group[3], group[4]];
      const vertical = group[2];

      blocks.push({ squares, vertical, flip });
      i += 5;
      flip = !flip;
    }

    return blocks;
  };

  const blocks = getBlocks();

  const getGridElements = (block: (typeof blocks)[number]) => {
    const { flip, vertical, squares } = block;

    const layout = flip
      ? [
          { post: vertical, className: 'col-start-1 row-start-1 row-span-2' },
          { post: squares[0], className: 'col-start-2 row-start-1' },
          { post: squares[1], className: 'col-start-3 row-start-1' },
          { post: squares[2], className: 'col-start-2 row-start-2' },
          { post: squares[3], className: 'col-start-3 row-start-2' },
        ]
      : [
          { post: squares[0], className: 'col-start-1 row-start-1' },
          { post: squares[1], className: 'col-start-2 row-start-1' },
          { post: squares[2], className: 'col-start-1 row-start-2' },
          { post: squares[3], className: 'col-start-2 row-start-2' },
          { post: vertical, className: 'col-start-3 row-start-1 row-span-2' },
        ];

    return layout.map(({ post, className }) => (
      <Link
        href={`/p/${post.id}`}
        key={post.id}
        className={`group relative ${className}`}
        style={{
          maxWidth: '310px',
          aspectRatio: className.includes('row-span-2') ? undefined : '1 / 1',
        }}
      >
        <img
          src={post.postImages[0].imageUrl}
          className='h-full w-full object-cover'
          alt=''
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
    ));
  };

  return (
    <>
      {blocks.map((block, index) => (
        <div
          key={index}
          className='mb-1 grid grid-cols-3 grid-rows-[repeat(2,minmax(0,1fr))] gap-1'
        >
          {getGridElements(block)}
        </div>
      ))}

      <Footer />
    </>
  );
};
