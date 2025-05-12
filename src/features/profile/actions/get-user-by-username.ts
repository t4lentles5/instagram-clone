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
      followers: true,
      following: true,
    },
  });

  console.log(user);

  if (!user) {
    notFound();
  }

  return user;
};
