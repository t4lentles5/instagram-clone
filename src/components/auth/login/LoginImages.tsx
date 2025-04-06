'use client';

import { useEffect, useState } from 'react';

const images = [
  '/login/screenshot1.png',
  '/login/screenshot2.png',
  '/login/screenshot3.png',
  '/login/screenshot4.png',
];

export const LoginImages = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className='relative mr-9 hidden w-[380px] bg-[url("/login/home-phones.png")] bg-auto bg-position-[center_top] bg-no-repeat lg:block'>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="img"
            style={{
              opacity: index === currentImageIndex ? 1 : 0,
            }}
            width={255}
            className="absolute top-[22px] left-[110px]"
          />
        ))}
      </div>
    </>
  );
};
