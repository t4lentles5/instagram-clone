'use server';

import { revalidatePath } from 'next/cache';
import { cloudinary } from '@/config/cloudinary';
import prisma from '@/config/prisma';
import { deleteProfilePhoto } from '@/actions/user/delete-profile-photo';

export const changeProfilePhoto = async (
  base64Image: string,
  username: string,
  profile_photo_id?: string,
) => {
  try {
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`,
      {
        format: 'webp',
        folder: process.env.CLOUDINARY_FOLDER,
        transformation: [
          {
            width: 320,
            height: 320,
            crop: 'fill',
            gravity: 'auto',
          },
        ],
      },
    );

    if (!result) {
      throw new Error('Failed to upload image to Cloudinary');
    }

    if (profile_photo_id) {
      await deleteProfilePhoto(profile_photo_id);
    }

    await prisma.user.update({
      where: { username: username },
      data: {
        profile_photo: result.secure_url,
        profile_photo_id: result.public_id,
      },
    });

    revalidatePath(`/`);
    return { success: true, url: result.secure_url };
  } catch (error) {
    console.error(error);
    return { error: 'Upload failed.' };
  }
};
