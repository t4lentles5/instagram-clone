'use server';

import { revalidateTag } from 'next/cache';
import prisma from '@/core/config/prisma';

import { getAuthenticatedUser } from '@/features/auth/actions/get-authenticated-user';

export async function unfollow(followingId: string) {
  const authenticatedUser = await getAuthenticatedUser();

  if (authenticatedUser.id === followingId) {
    throw new Error("You can't unfollow yourself");
  }

  await prisma.follow.delete({
    where: {
      followerId_followingId: {
        followerId: authenticatedUser.id,
        followingId,
      },
    },
  });

  revalidateTag('unfollow');
}
