'use server';

import prisma from '@/config/prisma';

export const getPostsByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const posts = await prisma.post.findMany({
    where: {
      authorId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      PostImages: {
        select: {
          imageUrl: true,
        },
      },
      author: {
        select: {
          username: true,
          profile_photo: true,
        },
      },
      caption: true,
      createdAt: true,
      id: true,
      likes: {
        select: {
          postId: true,
          userId: true,
        },
      },
      first_image_dimensions: true,
      aspect_ratio: true,
    },
  });

  return posts;
};
