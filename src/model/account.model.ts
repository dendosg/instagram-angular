import { UserModel } from "./user.model";

export interface AccountModel {
  _id: string;
  cookie: string;
  access_token: string;
  updatedTime: number;
  user: UserModel;
}
