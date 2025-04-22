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
    id: User['id'];
  };
  PostImages: { id: string; imageUrl: string }[];
  likes: {
    id: string;
    postId: string;
    userId: string;
  }[];
  comments: {
    id: string;
    postId: string;
    text: string;
    createdAt: Date;
    user: {
      username: User['username'];
      profile_photo: User['profile_photo'];
    };
  }[];
}
