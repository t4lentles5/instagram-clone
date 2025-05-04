import { useState } from 'react';

import { GoBackIcon, GoNextIcon } from '@/shared/icons';

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
              className='bg-web-always-white/70 text-web-always-black/30 shadow-web-always-black/20 absolute top-1/2 left-2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-[6px] shadow-2xs'
            >
              <GoBackIcon />
            </button>
          )}
          {current !== images.length - 1 && (
            <button
              onClick={next}
              className='bg-web-always-white/70 text-web-always-black/30 shadow-web-always-black/20 absolute top-1/2 right-2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-[6px] shadow-2xs'
            >
              <GoNextIcon />
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
                index === current
                  ? 'bg-web-always-white'
                  : 'bg-web-always-white/50'
              }`}
            />
          ))}
      </div>
    </>
  );
}
