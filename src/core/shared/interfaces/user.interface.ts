export interface User {
  id: string;
  email: string;
  fullname: string;
  username: string;
  profile_photo: string | null;
  profile_photo_id: string | null;
  bio: string | null;
  followers: Follow[];
  following: Follow[];
  _count: {
    posts: number;
  };
}

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
}
