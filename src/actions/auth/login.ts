'use server';

import prisma from '@/config/prisma';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export const login = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return { ok: false, message: 'User with that email not found' };
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return {
        ok: false,
        message: 'Incorrect password',
      };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '720h' },
    );

    const cookieStore = await cookies();

    cookieStore.set({
      name: 'INSTAGRAM_TOKEN',
      value: token,
      httpOnly: true,
      path: '/',
    });

    return { ok: true, user };
  } catch (error) {
    console.log(error);
    return { ok: false, message: 'An error occurred during login' };
  }
};
