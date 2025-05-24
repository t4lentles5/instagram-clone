'use server';

import prisma from '@/core/config/prisma';

export const getExplorePosts = async () => {
  const explorePosts = await prisma.post.findMany({
    take: 20,
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      aspect_ratio: true,
      first_image_dimensions: true,
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
      postImages: {
        select: {
          imageUrl: true,
        },
      },
    },
  });

  return explorePosts;
};
