'use server';

import { revalidatePath } from 'next/cache';
import { cloudinary } from '@/lib/cloudinary';
import prisma from '@/lib/prisma';

export const changeProfilePhoto = async (
  base64Image: string,
  username: string,
) => {
  try {
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`,
      {
        folder: process.env.CLOUDINARY_FOLDER,
      },
    );

    await prisma.user.update({
      where: { username: username },
      data: { profile_photo: result.secure_url },
    });

    revalidatePath(`/${username}`);
    return { success: true, url: result.secure_url };
  } catch (error) {
    console.error(error);
    return { error: 'Upload failed.' };
  }
};
