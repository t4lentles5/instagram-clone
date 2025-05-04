'use server';

import prisma from '@/core/config/prisma';
import { notFound } from 'next/navigation';

export const getUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    notFound();
  }

  return user;
};
