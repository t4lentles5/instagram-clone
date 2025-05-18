'use server';

import prisma from '@/core/config/prisma';
import { getAuthenticatedUser } from '@/features/auth/actions/get-authenticated-user';

export const getSavedPosts = async () => {
  const authenticatedUser = await getAuthenticatedUser();

  const posts = await prisma.savedPost.findMany({
    where: {
      userId: authenticatedUser.id,
    },
    include: {
      post: {
        include: {
          postImages: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 4,
  });

  return posts;
};
