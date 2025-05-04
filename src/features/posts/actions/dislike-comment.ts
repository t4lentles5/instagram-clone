'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/core/config/prisma';

export const dislikeComment = async (likeId: string, postId: string) => {
  const like = await prisma.commentLike.findFirst({
    where: {
      id: likeId,
    },
  });

  if (like) {
    await prisma.commentLike.delete({ where: { id: likeId } });
  }

  revalidatePath(`/p/${postId}`);
};
