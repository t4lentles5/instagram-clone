'use server';

import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

import prisma from '@/core/config/prisma';
import getToken from '@/features/auth/utils/cookies';

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
          username: true,
          fullname: true,
          profile_photo: true,
          profile_photo_id: true,
          bio: true,
        },
      });

      if (!user) {
        redirect('/auth/login');
      }

      return user;
    }

    throw new Error('Invalid token');
  } catch (error) {
    console.error('Error validating token:', error);

    if (error instanceof jwt.TokenExpiredError) {
      redirect('/auth/login');
    } else if (error instanceof jwt.JsonWebTokenError) {
      redirect('/auth/login');
    } else {
      throw error;
    }
  }
};
