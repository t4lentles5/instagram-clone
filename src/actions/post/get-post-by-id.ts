'use server';

import prisma from '@/config/prisma';

export const getPostById = async (postId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      id: true,
      author: {
        select: {
          username: true,
        },
      },
    },
  });

  if (!post) {
    return null;
  }

  return post;
};
