'use server';

import prisma from '@/core/config/prisma';
import { notFound } from 'next/navigation';

export const getUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      email: true,
      password: true,
      fullname: true,
      username: true,
      profile_photo: true,
      profile_photo_id: true,
      bio: true,
      _count: {
        select: {
          posts: true,
        },
      },
      followers: true,
      following: true,
    },
  });

  if (!user) {
    notFound();
  }

  return user;
};
