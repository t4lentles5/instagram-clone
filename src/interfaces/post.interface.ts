import { User } from '@/interfaces/user.interface';

export interface Post {
  id: string;
  caption?: string | null;
  createdAt: Date;
  location?: string | null;
  authorId: string;
  aspect_ratio: 'original' | 'square' | 'portrait' | 'video';
  first_image_dimensions: string | null;
  author: Author;
  postImages: PostImage[];
  likes: Like[];
  comments: Comment[];
}

export interface Author {
  profile_photo: User['profile_photo'];
  username: User['username'];
  id: User['id'];
}

export interface PostImage {
  id: string;
  imageUrl: string;
}

export interface Like {
  id: string;
  userId: string;
  postId: string;
  user: {
    username: User['username'];
    profile_photo: User['profile_photo'];
    fullname: User['fullname'];
    id: User['id'];
  };
}

export interface Comment {
  id: string;
  postId: string;
  text: string;
  createdAt: Date;
  user: {
    username: User['username'];
    profile_photo: User['profile_photo'];
  };
}
