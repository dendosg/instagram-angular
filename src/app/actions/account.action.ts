import { Action } from "@ngrx/store";
import { AccountModel } from "model/account.model";
import { UserModel } from "model/user.model";

export enum AccountActionTypes {
  LoadAccountsAction = "[Account] Load Accounts",
  LoadAccountsSuccessAction = "[Account] Load Accounts Success",
  LoadAccountsFailureAction = "[Account] Load Accounts Failure",

  AddAccountAction = "[Account] Add Account",
  AddAccountSuccessAction = "[Account] Add Account Success",
  AddAccountFailureAction = "[Account] Add Account Failure"
}

export class LoadAccounts implements Action {
  public readonly type = AccountActionTypes.LoadAccountsAction;
}

export class LoadAccountsSuccess implements Action {
  public readonly type = AccountActionTypes.LoadAccountsSuccessAction;
  constructor(public accounts: AccountModel[]) {}
}

export class LoadAccountsFailure implements Action {
  public readonly type = AccountActionTypes.LoadAccountsFailureAction;
}

export class AddAccount implements Action {
  public readonly type = AccountActionTypes.AddAccountAction;
  constructor(public cookie: string, public user: UserModel) {}
}

export class AddAccountSuccess implements Action {
  public readonly type = AccountActionTypes.AddAccountSuccessAction;
  constructor(public account: AccountModel) {}
}

export class AddAccountFailure implements Action {
  public readonly type = AccountActionTypes.AddAccountFailureAction;
}

export type AccountActionsUnion =
  | LoadAccounts
  | LoadAccountsSuccess
  | LoadAccountsFailure
  | AddAccount
  | AddAccountSuccess
  | AddAccountFailure;
