'use server';

import { cloudinary } from '@/config/cloudinary';
import prisma from '@/config/prisma';

export const deleteProfilePhoto = async (
  profile_photo_id: string,
  userId?: string,
) => {
  if (!profile_photo_id) {
    return { ok: false, error: 'Missing public_id' };
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
      return { ok: true };
    } else {
      return { ok: false, error: 'Cloudinary did not confirm deletion.' };
    }
  } catch (error) {
    console.error('[DELETE_PHOTO_ERROR]', error);
    return { ok: false, error: 'Failed to delete image.' };
  }
};
