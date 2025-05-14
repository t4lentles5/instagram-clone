'use server';

import prisma from '@/core/config/prisma';

export const isFollowingUser = async (
  followerId: string,
  followingId: string,
): Promise<boolean> => {
  const follow = await prisma.follow.findFirst({
    where: {
      followerId,
      followingId,
    },
    select: {
      id: true,
    },
  });

  return !!follow;
};
