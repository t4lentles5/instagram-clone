'use server';

import prisma from '@/lib/prisma';

export const getRecommendedUsers = async (id: string) => {
  const users = await prisma.user.findMany({
    take: 5,
    orderBy: { username: 'asc' },
    where: {
      id: { not: id },
    },
  });

  return users;
};
