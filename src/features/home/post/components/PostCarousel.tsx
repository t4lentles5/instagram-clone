import { useState } from 'react';
import { NextIcon } from '../icons/NextIcon';
import { BackIcon } from '../icons/BackIcon';

interface Props {
  aspect_ratio: 'original' | 'square' | 'portrait' | 'video';
  images: string[];
}

export function PostCarousel({ images, aspect_ratio }: Props) {
  const [current, setCurrent] = useState(0);
  const [aspectRatio, setAspectRatio] = useState<string | null>(null);

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const getAspectClass = () => {
    if (aspect_ratio === 'square') return 'aspect-square';
    if (aspect_ratio === 'portrait') return 'aspect-[4/5]';
    if (aspect_ratio === 'video') return 'aspect-video';
    if (aspect_ratio === 'original' && aspectRatio)
      return `aspect-[${aspectRatio}]`;
    return 'aspect-square';
  };

  return (
    <div
      className={`${getAspectClass()} border-border relative h-full overflow-hidden rounded-[4px] border`}
    >
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt=""
          onLoad={(e) => {
            if (aspect_ratio === 'original' && !aspectRatio) {
              const target = e.target as HTMLImageElement;
              const ratio = (
                target.naturalWidth / target.naturalHeight
              ).toFixed(5);
              setAspectRatio(ratio);
            }
          }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
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
