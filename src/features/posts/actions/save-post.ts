'use server';

import { revalidateTag } from 'next/cache';
import prisma from '@/core/config/prisma';

export const savePost = async (postId: string, userId: string) => {
  await prisma.savedPost.create({
    data: {
      postId,
      userId,
    },
  });

  revalidateTag('save');
};
