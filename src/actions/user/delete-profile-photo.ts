'use server';

import { cloudinary } from '@/lib/cloudinary';

export const deleteProfilePhoto = async (profile_photo_id: string) => {
  if (!profile_photo_id) {
    return { ok: false, error: 'Missing public_id' };
  }

  try {
    const result = await cloudinary.uploader.destroy(profile_photo_id);

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
