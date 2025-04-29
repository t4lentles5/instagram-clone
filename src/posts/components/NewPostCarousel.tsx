'use client';

import { useState } from 'react';

import { LeftChevron, RightChevron } from '@/posts/icons';

interface Props {
  selectedFiles: File[];
}

export function NewPostCarousel({ selectedFiles }: Props) {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? selectedFiles.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === selectedFiles.length - 1 ? 0 : prev + 1));
  };

  if (selectedFiles.length === 0) return null;

  return (
    <div className='relative aspect-square h-full w-full'>
      <img
        src={URL.createObjectURL(selectedFiles[current])}
        alt='Selected Image'
        className='h-full w-full object-cover'
      />

      {selectedFiles.length > 1 && (
        <>
          {current !== 0 && (
            <button
              onClick={prev}
              className='bg-background-overlay text-primary absolute top-1/2 left-2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-2'
            >
              <LeftChevron />
            </button>
          )}
          {current !== selectedFiles.length - 1 && (
            <button
              onClick={next}
              className='bg-background-overlay text-primary absolute top-1/2 right-2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-2'
            >
              <RightChevron />
            </button>
          )}
        </>
      )}

      <div className='absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 justify-center gap-1'>
        {selectedFiles.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 w-2 cursor-pointer rounded-full ${
              index === current ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
