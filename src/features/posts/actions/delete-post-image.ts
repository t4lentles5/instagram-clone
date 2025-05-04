'use server';

import { cloudinary } from '@/core/config/cloudinary';
import prisma from '@/core/config/prisma';

export const deletePostImages = async (postId: string, imagesId: string[]) => {
  for (const imageId of imagesId) {
    await cloudinary.uploader.destroy(imageId);

    await prisma.postImages.updateMany({
      where: { id: postId },
      data: {
        imageUrl: '',
        imageUrlId: '',
      },
    });
  }
};
