export interface AuthenticatedUser {
  id: string;
  fullname: string;
  username: string;
  profile_photo: string | null;
  profile_photo_id: string | null;
  bio: string | null;
}
