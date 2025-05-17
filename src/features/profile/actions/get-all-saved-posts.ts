'use server';

import prisma from '@/core/config/prisma';
import { getAuthenticatedUser } from '@/features/auth/actions/get-authenticated-user';

export const getAllSavedPosts = async () => {
  const user = await getAuthenticatedUser();

  if (!user) {
    return [];
  }

  const savedPosts = await prisma.savedPost.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      post: {
        select: {
          id: true,
          postImages: true,
          _count: {
            select: {
              likes: true,
              comments: true,
            },
          },
        },
      },
    },
  });

  return savedPosts;
};
