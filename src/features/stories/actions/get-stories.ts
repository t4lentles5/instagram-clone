'use server';

import prisma from '@/core/config/prisma';

export const getStories = async (authenticatedUserId: string) => {
  const stories = await prisma.follow.findMany({
    where: {
      followerId: authenticatedUserId,
    },
    select: {
      following: {
        select: {
          profile_photo: true,
          username: true,
        },
      },
      id: true,
    },
  });

  return stories;
};
