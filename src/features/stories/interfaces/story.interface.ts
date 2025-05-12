export interface Story {
  id: string;
  following: {
    profile_photo: string | null;
    username: string;
  };
}
