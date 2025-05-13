'use server';

import { revalidateTag } from 'next/cache';

import prisma from '@/core/config/prisma';
import { getAuthenticatedUser } from '@/features/auth/actions/get-authenticated-user';

export async function follow(followingId: string) {
  const authenticatedUser = await getAuthenticatedUser();

  if (authenticatedUser.id === followingId) {
    throw new Error("You can't follow yourself");
  }

  await prisma.follow.create({
    data: {
      followerId: authenticatedUser.id,
      followingId,
    },
  });

  revalidateTag('follow');
}
