'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/config/prisma';

export const dislikePost = async (likeId: string) => {
  const like = await prisma.like.findFirst({
    where: {
      id: likeId,
    },
  });

  if (like) {
    await prisma.like.delete({ where: { id: likeId } });
  }

  revalidatePath('/');
};
