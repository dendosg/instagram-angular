import { Action } from "@ngrx/store";
import { AccountModel } from "model/account.model";

export enum AccountActionTypes {
  LoadAccountsAction = "[Account] Load Accounts",
  LoadAccountsSuccessAction = "[Account] Load Accounts Success",
  LoadAccountsFailureAction = "[Account] Load Accounts Failure"
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

export type AccountActionsUnion =
  | LoadAccounts
  | LoadAccountsSuccess
  | LoadAccountsFailure;
