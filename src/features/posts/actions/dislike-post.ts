'use server';

import { revalidateTag } from 'next/cache';
import prisma from '@/core/config/prisma';

export const dislikePost = async (likeId: string) => {
  const like = await prisma.like.findFirst({
    where: {
      id: likeId,
    },
  });

  if (like) {
    await prisma.like.delete({ where: { id: likeId } });
  }

  revalidateTag('like');
};
