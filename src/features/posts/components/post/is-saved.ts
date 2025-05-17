'use server';

import prisma from '@/core/config/prisma';

export const isSaved = async (postId: string, userId: string) => {
  const savedPost = await prisma.savedPost.findUnique({
    where: {
      userId_postId: {
        postId,
        userId,
      },
    },
  });

  return !!savedPost;
};
