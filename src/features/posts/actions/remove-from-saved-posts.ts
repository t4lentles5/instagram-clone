'use server';

import prisma from '@/core/config/prisma';
import { revalidateTag } from 'next/cache';

export const removeFromSavedPosts = async (postId: string, userId: string) => {
  await prisma.savedPost.delete({
    where: {
      userId_postId: {
        postId,
        userId,
      },
    },
  });

  revalidateTag('save');
};
