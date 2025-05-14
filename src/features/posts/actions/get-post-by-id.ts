'use server';

import prisma from '@/core/config/prisma';

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
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          postId: true,
          userId: true,
          user: {
            select: {
              username: true,
              profile_photo: true,
              fullname: true,
              id: true,
            },
          },
        },
      },
      comments: {
        where: { parentId: null },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          postId: true,
          text: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              username: true,
              profile_photo: true,
            },
          },
          replies: {
            orderBy: { createdAt: 'asc' },
            select: {
              id: true,
              parentId: true,
              postId: true,
              text: true,
              createdAt: true,
              user: {
                select: {
                  id: true,
                  username: true,
                  profile_photo: true,
                },
              },
              commentLike: {
                orderBy: { createdAt: 'desc' },
                select: {
                  id: true,
                  userId: true,
                  commentId: true,
                  user: {
                    select: {
                      id: true,
                      username: true,
                      profile_photo: true,
                      fullname: true,
                    },
                  },
                },
              },
            },
          },
          commentLike: {
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              userId: true,
              commentId: true,
              user: {
                select: {
                  id: true,
                  username: true,
                  profile_photo: true,
                  fullname: true,
                },
              },
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
