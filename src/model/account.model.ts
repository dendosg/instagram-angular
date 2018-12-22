import { UserModel } from "./user.model";

export interface AccountModel {
  _id: string;
  cookie: string;
  updatedTime: number;
  user: UserModel;
}
