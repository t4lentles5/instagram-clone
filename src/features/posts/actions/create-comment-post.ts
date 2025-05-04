'use server';

import prisma from '@/core/config/prisma';
import { revalidatePath } from 'next/cache';

export const createCommentPost = async (
  text: string,
  postId: string,
  userId: string,
  parentId?: string,
) => {
  if (!parentId) {
    await prisma.comment.create({
      data: {
        text,
        postId,
        userId,
      },
    });

    revalidatePath(`/p/${postId}`);
    return;
  }

  const parentComment = await prisma.comment.findFirst({
    where: { id: parentId },
  });

  if (!parentComment) {
    return;
  }

  await prisma.comment.create({
    data: {
      text,
      postId,
      userId,
      parentId,
    },
  });

  revalidatePath(`/p/${postId}`);
};
