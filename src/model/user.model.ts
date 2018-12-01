export interface UserModel {
  _id: string;
  fullName: string;
  username: string;
  biography: string;
  postsCount: number;
  followingCount: number;
  followerCount: number;
  privacy: boolean;
  verified: boolean;
  website: string;
}
