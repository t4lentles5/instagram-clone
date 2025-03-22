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
      <div className='bg-[url("/login/home-phones.png")] hidden lg:block bg-no-repeat bg-[-46px_0] mr-8 bg-auto w-[380px] relative'>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt='img'
            style={{
              opacity: index === currentImageIndex ? 1 : 0,
            }}
            width={250}
            className='absolute top-6 left-[110px] transition-opacity duration-300'
          />
        ))}
      </div>
    </>
  );
};
