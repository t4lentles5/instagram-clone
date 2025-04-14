'use server';

import prisma from '@/config/prisma';

export const getPostsCountByUsername = async (username: string) => {
  const postsCount = await prisma.post.count({
    where: { author: { username: username } },
  });

  return postsCount;
};
