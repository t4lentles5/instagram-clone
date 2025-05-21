'use server';

import prisma from '@/core/config/prisma';
import { getAuthenticatedUser } from '@/features/auth/actions/get-authenticated-user';

export async function deleteRecentSearch(searchedUserId: string) {
  const authenticatedUser = await getAuthenticatedUser();

  try {
    await prisma.recentSearch.deleteMany({
      where: {
        userId: authenticatedUser.id,
        searchedUserId,
      },
    });
  } catch (error) {
    console.error('Error removing recent search:', error);
  }
}
