'use server';

import { revalidateTag } from 'next/cache';

import { cloudinary } from '@/core/config/cloudinary';
import prisma from '@/core/config/prisma';

export const deletePost = async (postId: string) => {
  try {
    await prisma.like.deleteMany({
      where: {
        postId: postId,
      },
    });

    await prisma.commentLike.deleteMany({
      where: {
        comment: {
          postId: postId,
        },
      },
    });

    await prisma.comment.deleteMany({
      where: {
        postId: postId,
      },
    });

    const postImages = await prisma.postImages.findMany({
      where: {
        postId: postId,
      },
    });

    for (const image of postImages) {
      await cloudinary.uploader.destroy(image.imageUrlId);
    }

    await prisma.postImages.deleteMany({
      where: {
        postId: postId,
      },
    });

    await prisma.savedPost.deleteMany({
      where: {
        postId: postId,
      },
    });

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    revalidateTag('posts');
  } catch (error) {
    console.error(error);
    return { error: 'Failed to delete post' };
  }
};
