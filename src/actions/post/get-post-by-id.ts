'use server';

import prisma from '@/config/prisma';

export const getPostById = async (postId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
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
    },
  });

  if (!post) {
    return null;
  }

  return post;
};
