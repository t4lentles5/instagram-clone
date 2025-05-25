'use server';

import prisma from '@/core/config/prisma';
import { getAuthenticatedUser } from '@/features/auth/actions/get-authenticated-user';

export async function getRecentSearches() {
  const authenticatedUser = await getAuthenticatedUser();

  try {
    const searches = await prisma.recentSearch.findMany({
      where: { userId: authenticatedUser.id },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        createdAt: true,
        searchedUserId: true,
        searchedUser: {
          select: {
            id: true,
            username: true,
            fullname: true,
            profile_photo: true,
          },
        },
      },
      take: 15,
    });
    return searches;
  } catch (error) {
    console.error('Error fetching recent searches:', error);
    return [];
  }
}
