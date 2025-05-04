'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/core/config/prisma';

export const likePost = async (postId: string, userId: string) => {
  const like = await prisma.like.findFirst({
    where: {
      postId,
      userId,
    },
  });

  if (like) return;

  await prisma.like.create({
    data: {
      postId: postId,
      userId: userId,
    },
  });

  revalidatePath('/');
};
