'use server';

import prisma from '@/core/config/prisma';

export const getFollowersWithFollowing = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      followers: {
        select: {
          follower: {
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

  return user.followers.map(({ follower }) => ({
    id: follower.id,
    username: follower.username,
    fullname: follower.fullname,
    profile_photo: follower.profile_photo,
  }));
};
