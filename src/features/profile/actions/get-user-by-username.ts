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
          followers: true,
          following: true,
        },
      },
      // followers: {
      //   select: {
      //     id: true,
      //     follower: {
      //       select: {
      //         id: true,
      //         username: true,
      //         profile_photo: true,
      //         fullname: true,
      //       },
      //     },
      //   },
      // },
      // following: {
      //   select: {
      //     id: true,
      //     following: {
      //       select: {
      //         id: true,
      //         username: true,
      //         profile_photo: true,
      //         fullname: true,
      //       },
      //     },
      //   },
      // },
    },
  });

  if (!user) {
    notFound();
  }

  return {
    ...user,
    // followers: user.followers.map(({ follower }) => follower),
    // following: user.following.map(({ following }) => following),
  };
};
