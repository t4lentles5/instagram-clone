'use server';

import prisma from '@/config/prisma';
import { revalidatePath } from 'next/cache';

export const createCommentPost = async (
  text: string,
  postId: string,
  userId: string,
) => {
  await prisma.comment.create({
    data: {
      text,
      postId,
      userId,
    },
  });

  revalidatePath(`/p/${postId}`);
};
