export const getAspectClass = (
  aspect_ratio: string,
  first_image_dimensions: string,
) => {
  if (aspect_ratio === 'square') return '1';
  if (aspect_ratio === 'portrait') return '4/5';
  if (aspect_ratio === 'video') return '16/9';
  if (aspect_ratio === 'original') return first_image_dimensions!;
};
