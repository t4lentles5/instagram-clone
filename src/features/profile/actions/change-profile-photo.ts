'use server';

import { cloudinary } from '@/core/config/cloudinary';
import prisma from '@/core/config/prisma';
import { deleteProfilePhoto } from '@/features/profile/actions/delete-profile-photo';
import { getAuthenticatedUser } from '@/features/auth/actions/get-authenticated-user';

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

    const user = await getAuthenticatedUser();

    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Upload failed.');
  }
};
