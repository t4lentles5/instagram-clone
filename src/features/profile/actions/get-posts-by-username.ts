'use server';

import prisma from '@/core/config/prisma';

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
      author: {
        select: {
          profile_photo: true,
          username: true,
          id: true,
        },
      },
      id: true,
      authorId: true,
      postImages: {
        select: {
          id: true,
          imageUrl: true,
        },
      },
      likes: {
        select: {
          id: true,
          postId: true,
        },
      },
      comments: {
        select: {
          id: true,
          postId: true,
        },
      },
    },
  });

  return posts;
};
