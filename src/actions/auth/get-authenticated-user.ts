'use server';

import jwt from 'jsonwebtoken';
import prisma from '@/config/prisma';
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
