'use server';

import prisma from '@/core/config/prisma';

export const getRecommendedUsers = async (id: string) => {
  const users = await prisma.user.findMany({
    take: 5,
    orderBy: { username: 'asc' },
    where: {
      id: { not: id },
      followers: {
        none: { followerId: id },
      },
    },
    select: {
      id: true,
      profile_photo: true,
      username: true,
      fullname: true,
      _count: {
        select: {
          followers: true,
          posts: true,
          following: true,
        },
      },
      posts: {
        take: 3,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          postImages: {
            take: 1,
            select: {
              imageUrl: true,
            },
          },
        },
      },
    },
  });

  return users;
};
