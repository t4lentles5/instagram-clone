'use server';

import prisma from '@/core/config/prisma';
import { getAuthenticatedUser } from '@/features/auth/actions/get-authenticated-user';

export async function deleteAllRecentSearches() {
  const authenticatedUser = await getAuthenticatedUser();

  try {
    await prisma.recentSearch.deleteMany({
      where: {
        userId: authenticatedUser.id,
      },
    });
  } catch (error) {
    console.error('Error removing recent search:', error);
  }
}
