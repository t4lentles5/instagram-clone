import { useState } from 'react';
import { NextIcon } from '../icons/NextIcon';
import { BackIcon } from '../icons/BackIcon';

export function PostCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="border-border relative aspect-square h-full overflow-hidden rounded-[4px] border">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt=""
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain ${index === current ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}

      {images.length > 1 && (
        <>
          {current !== 0 && (
            <button
              onClick={prev}
              className="text-background bg-primary absolute top-1/2 left-2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-[6px]"
            >
              <BackIcon />
            </button>
          )}

          {current !== images.length - 1 && (
            <button
              onClick={next}
              className="text-background bg-primary absolute top-1/2 right-2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-[6px]"
            >
              <NextIcon />
            </button>
          )}
        </>
      )}
    </div>
  );
}
