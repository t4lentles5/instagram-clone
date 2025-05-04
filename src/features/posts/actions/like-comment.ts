'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/core/config/prisma';

export const likeComment = async (
  userId: string,
  commentId: string,
  postId: string,
) => {
  const comment = await prisma.commentLike.findFirst({
    where: {
      commentId,
      userId,
    },
  });

  if (comment) return;

  await prisma.commentLike.create({ data: { userId, commentId } });

  revalidatePath(`/p/${postId}`);
};
