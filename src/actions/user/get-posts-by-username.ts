'use server';

import prisma from '@/config/prisma';

export const getPostsByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const posts = await prisma.post.findMany({
    where: {
      authorId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      author: {
        select: {
          profile_photo: true,
          username: true,
          id: true,
        },
      },
      id: true,
      caption: true,
      createdAt: true,
      location: true,
      authorId: true,
      aspect_ratio: true,
      first_image_dimensions: true,
      PostImages: {
        select: {
          id: true,
          imageUrl: true,
        },
      },
      likes: {
        select: { id: true, postId: true, userId: true },
      },
      comments: {
        select: {
          id: true,
          postId: true,
          text: true,
          createdAt: true,
          user: {
            select: {
              username: true,
              profile_photo: true,
            },
          },
        },
      },
    },
  });

  return posts;
};
