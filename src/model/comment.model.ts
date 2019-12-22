import { UserModel } from "./user.model";

export interface CommentFromApi {
  id: string;
  created_at: Date;
  text: string;
  owner: UserModel;
}
export class CommentModel {
  public id: string;
  public created_at: Date;
  public text: string;
  public username: string;
  public owner_id: number;
  public profile_pic_url: string;
  constructor(c: CommentFromApi) {
    this.id = c.id;
    this.username = c.owner.username;
    this.profile_pic_url = c.owner.profile_pic_url;
    this.owner_id = c.owner.id;
    this.text = c.text;
    this.created_at = c.created_at;
  }
}
