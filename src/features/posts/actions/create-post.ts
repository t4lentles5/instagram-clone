'use server';

import { cloudinary } from '@/core/config/cloudinary';
import prisma from '@/core/config/prisma';

export const createPost = async (base64Image: string, postId: string) => {
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      format: 'webp',
      folder: process.env.CLOUDINARY_FOLDER,
    });

    if (!result) {
      throw new Error('Failed to upload image to Cloudinary');
    }

    await prisma.postImages.create({
      data: {
        imageUrl: result.secure_url,
        imageUrlId: result.public_id,
        postId: postId,
      },
    });

    return { success: true, url: result.secure_url };
  } catch (error) {
    console.error(error);
    return { error: 'Upload failed.' };
  }
};
