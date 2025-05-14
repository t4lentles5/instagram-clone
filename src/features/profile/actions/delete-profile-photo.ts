'use server';

import { cloudinary } from '@/core/config/cloudinary';
import prisma from '@/core/config/prisma';
import { getAuthenticatedUser } from '@/features/auth/actions/get-authenticated-user';

export const deleteProfilePhoto = async (
  profile_photo_id: string,
  userId?: string,
) => {
  if (!profile_photo_id) {
    throw new Error('Missing public_id');
  }

  try {
    const result = await cloudinary.uploader.destroy(profile_photo_id);

    if (userId) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          profile_photo: null,
          profile_photo_id: null,
        },
      });
    }

    if (result.result === 'ok') {
      const user = await getAuthenticatedUser();

      return user;
    } else {
      throw new Error('Cloudinary did not confirm deletion.');
    }
  } catch (error) {
    console.error('[DELETE_PHOTO_ERROR]', error);
    throw new Error('Failed to delete image.');
  }
};
