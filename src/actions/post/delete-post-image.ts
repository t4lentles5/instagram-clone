'use server';

import { cloudinary } from '@/config/cloudinary';
import prisma from '@/config/prisma';

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
