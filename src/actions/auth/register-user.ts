'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export const registerUser = async (
  email: string,
  password: string,
  fullname: string,
  username: string
) => {
  try {
    const emailFound = await prisma.user.findUnique({
      where: { email },
    });

    if (emailFound) {
      return { ok: false, message: 'Email already exists' };
    }

    const usernameFound = await prisma.user.findUnique({
      where: { username },
    });

    if (usernameFound) {
      return {
        ok: false,
        message: 'Username already exists',
      };
    }

    await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, 10),
        fullname,
        username,
      },
    });

    return { ok: true, message: 'User created successfully' };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'An error occurred while registering the user',
    };
  }
};
