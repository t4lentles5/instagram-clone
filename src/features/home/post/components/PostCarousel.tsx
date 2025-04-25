import { useState } from 'react';

import { BackIcon } from '@/features/home/post/icons/BackIcon';
import { NextIcon } from '@/features/home/post/icons/NextIcon';

interface Props {
  images: string[];
}

export function PostCarousel({ images }: Props) {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {images.length > 0 && (
        <img
          key={current}
          src={images[current]}
          alt=''
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain'
        />
      )}

      {images.length > 1 && (
        <>
          {current !== 0 && (
            <button
              onClick={prev}
              className='absolute top-1/2 left-2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white p-[6px] text-black'
            >
              <BackIcon />
            </button>
          )}
          {current !== images.length - 1 && (
            <button
              onClick={next}
              className='absolute top-1/2 right-2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white p-[6px] text-black'
            >
              <NextIcon />
            </button>
          )}
        </>
      )}

      <div className='absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 justify-center gap-1'>
        {images.length > 1 &&
          images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-1.5 w-1.5 cursor-pointer rounded-full ${
                index === current ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
      </div>
    </>
  );
}
