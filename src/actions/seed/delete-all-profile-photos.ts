'use server';

import { cloudinary } from '@/config/cloudinary';

export const deleteAllProfilePhotos = async () => {
  try {
    const result =
      await cloudinary.api.delete_resources_by_prefix('instagram-clone/');

    return { ok: true, deleted: result.deleted };
  } catch (error) {
    console.error('[DELETE_ALL_PHOTOS_ERROR]', error);
    return { ok: false, error: 'Failed to delete images in folder.' };
  }
};
