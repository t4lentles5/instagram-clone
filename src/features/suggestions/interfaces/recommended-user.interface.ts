export interface RecommendedUser {
  id: string;
  profile_photo: string | null;
  username: string;
  fullname: string;
  _count: {
    followers: number;
    posts: number;
    following: number;
  };
  posts: {
    id: string;
    postImages: {
      imageUrl: string;
    }[];
  }[];
}
