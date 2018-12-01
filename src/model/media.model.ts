export interface MediaModel {
  _id: string;
  link: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  isVideo: boolean;
  location: string;
  owner: string;
  takenAt: string;
}
