'use server';
import prisma from '@/config/prisma';

export const getPosts = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
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
      aspect_ratio: true,
      first_image_dimensions: true,
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
