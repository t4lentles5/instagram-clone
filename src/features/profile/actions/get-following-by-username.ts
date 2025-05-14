'use server';

import prisma from '@/core/config/prisma';

export const getFollowingByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      following: {
        select: {
          following: {
            select: {
              id: true,
              username: true,
              fullname: true,
              profile_photo: true,
            },
          },
        },
      },
    },
  });

  if (!user) return [];

  return user.following.map(({ following }) => ({
    id: following.id,
    username: following.username,
    fullname: following.fullname,
    profile_photo: following.profile_photo,
  }));
};
