'use server';

import prisma from '@/core/config/prisma';
import { getAuthenticatedUser } from '@/features/auth/actions/get-authenticated-user';

export async function addRecentSearch(userId: string) {
  const authenticatedUser = await getAuthenticatedUser();

  try {
    await prisma.recentSearch.upsert({
      where: {
        userId_searchedUserId: {
          userId: authenticatedUser.id,
          searchedUserId: userId,
        },
      },
      update: {
        searchedUserId: userId,
      },
      create: {
        userId: authenticatedUser.id,
        searchedUserId: userId,
      },
    });
  } catch (error) {
    console.error('Error in addRecentSearch:', error);
  }
}
