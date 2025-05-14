export interface User {
  id: string;
  email: string;
  password: string;
  fullname: string;
  username: string;
  profile_photo: string | null;
  profile_photo_id: string | null;
  bio: string | null;
  _count: {
    posts: number;
    followers: number;
    following: number;
  };
}
