'use server';

import prisma from '@/config/prisma';
import bcrypt from 'bcrypt';

export const emailVerify = async (email: string) => {
  const emailExists = await prisma.user.findUnique({
    where: { email },
  });

  if (emailExists) {
    return { ok: false, message: 'Email already exists' };
  }

  return {
    ok: true,
    message: 'Email available',
  };
};

export const usernameVerify = async (username: string) => {
  const usernameExists = await prisma.user.findUnique({
    where: { username },
  });

  if (usernameExists) {
    return {
      ok: false,
      message: 'Username already exists',
    };
  }

  return {
    ok: true,
    message: 'Username available',
  };
};

export const registerUser = async (
  email: string,
  password: string,
  fullname: string,
  username: string,
) => {
  try {
    const emailResponse = await emailVerify(email);
    const usernameResponse = await usernameVerify(username);

    if (!emailResponse.ok && !usernameResponse.ok) {
      return {
        ok: false,
        message: 'An error occurred while registering the user',
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
