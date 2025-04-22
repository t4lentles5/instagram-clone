'use server';

import prisma from '@/config/prisma';

export const getPostById = async (postId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
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
      postImages: {
        select: {
          id: true,
          imageUrl: true,
        },
      },
      likes: {
        select: { id: true, postId: true, userId: true },
      },
      comments: {
        orderBy: { createdAt: 'desc' },
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

  if (!post) {
    return null;
  }

  return post;
};
