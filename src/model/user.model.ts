export interface UserModel {
  _id: string;
  full_name: string;
  username: string;
  biography: string;
  postsCount: number;
  followingCount: number;
  followerCount: number;
  isPrivate: boolean;
  verified: boolean;
  website: string;
  highlight_reel_count: number;
}
