'use server';

import { revalidatePath } from 'next/cache';
import { cloudinary } from '@/config/cloudinary';
import prisma from '@/config/prisma';

export const createPost = async (base64Image: string, postId: string) => {
  try {
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`,
      {
        format: 'webp',
        folder: process.env.CLOUDINARY_FOLDER,
        // transformation: [
        //   {
        //     width: 320,
        //     height: 320,
        //     crop: 'fill',
        //     gravity: 'auto',
        //   },
        // ],
      },
    );

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

    revalidatePath(`/`);

    return { success: true, url: result.secure_url };
  } catch (error) {
    console.error(error);
    return { error: 'Upload failed.' };
  }
};
