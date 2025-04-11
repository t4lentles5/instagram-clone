import { User } from './user.interface';

export interface Post {
  id: string;
  caption?: string | null;
  createdAt: Date;
  location?: string | null;
  authorId: string;
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
