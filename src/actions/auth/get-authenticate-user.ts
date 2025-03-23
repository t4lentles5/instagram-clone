'use server';

import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import getToken from '@/utils/cookies';
import { redirect } from 'next/navigation';

export const getAuthenticatedUser = async () => {
  try {
    const token = await getToken();

    if (!token) {
      redirect('/auth/login');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded === 'object' && 'id' in decoded) {
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          email: true,
          fullname: true,
          username: true,
          // profile_photo: true,
        },
      });

      if (!user) {
        return null;
      }

      return user;
    }

    return null;
  } catch (error) {
    console.error('Error validating token:', error);
    return null;
  }
};
