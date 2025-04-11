'use server';
import prisma from '@/config/prisma';

export const getPosts = async () => {
  const posts = prisma.post.findMany({
    select: {
      author: {
        select: {
          profile_photo: true,
          username: true,
        },
      },
      id: true,
      caption: true,
      createdAt: true,
      location: true,
      authorId: true,
      PostImages: {
        select: {
          id: true,
          imageUrl: true,
        },
      },
    },
  });

  return posts;
};
