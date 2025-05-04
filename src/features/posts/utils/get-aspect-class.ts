import { Post } from '@/core/shared/interfaces/post.interface';

export const getAspectClass = (
  aspect_ratio: Post['aspect_ratio'],
  first_image_dimensions: Post['first_image_dimensions'],
) => {
  if (aspect_ratio === 'square') return '1';
  if (aspect_ratio === 'portrait') return '4/5';
  if (aspect_ratio === 'video') return '16/9';
  if (aspect_ratio === 'original') return first_image_dimensions!;
};
