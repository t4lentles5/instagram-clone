'use server';

import prisma from '@/core/config/prisma';
import { getAuthenticatedUser } from '@/features/auth/actions/get-authenticated-user';

const MAX_RECENT_SEARCHES = 10;

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
        createdAt: new Date(),
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

export async function getRecentSearches() {
  const authenticatedUser = await getAuthenticatedUser();

  try {
    const searches = await prisma.recentSearch.findMany({
      where: { userId: authenticatedUser.id },
      orderBy: { createdAt: 'desc' },
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
      take: MAX_RECENT_SEARCHES,
    });
    return searches;
  } catch (error) {
    console.error('Error fetching recent searches:', error);
    return [];
  }
}

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
