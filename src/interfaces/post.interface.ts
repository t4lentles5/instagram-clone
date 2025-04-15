import { User } from './user.interface';

export interface Post {
  id: string;
  caption?: string | null;
  createdAt: Date;
  location?: string | null;
  authorId: string;
  aspect_ratio: 'original' | 'square' | 'portrait' | 'video';
  first_image_dimensions: string | null;
  author: {
    profile_photo: User['profile_photo'];
    username: User['username'];
  };
  PostImages: PostImagesI[];
}

interface PostImagesI {
  id: string;
  imageUrl: string;
}
