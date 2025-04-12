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
    select: {
      id: true,
      PostImages: {
        select: { imageUrl: true, imageUrlId: true },
      },
      author: {
        select: {
          profile_photo: true,
          username: true,
        },
      },
      createdAt: true,
    },
  });

  return posts;
};
