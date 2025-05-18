'use server';

import prisma from '@/core/config/prisma';

export const searchUsers = async (query: string) => {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          username: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          fullname: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    },
    select: {
      id: true,
      username: true,
      fullname: true,
      profile_photo: true,
    },
    take: 5,
  });

  return users;
};
