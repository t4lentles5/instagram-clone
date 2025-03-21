'use server';

import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

export const getAuthenticatedUser = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded === 'object' && 'id' in decoded) {
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        omit: { password: true },
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
