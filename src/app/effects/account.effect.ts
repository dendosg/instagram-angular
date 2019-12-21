import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, filter, map, mergeMap, switchMap } from "rxjs/operators";
import {
  LoadAccounts,
  AccountActionTypes,
  LoadAccountsFailure,
  LoadAccountsSuccess,
  AddAccount,
  AddAccountSuccess,
  AddAccountFailure
} from "app/actions/account.action";
import { AccountService } from "app/_service/account.service";
import { AccountModel } from "model/account.model";

@Injectable()
export class AccountsEffects {
  @Effect() public loadAccounts$: Observable<Action> = this.actions$.pipe(
    ofType<LoadAccounts>(AccountActionTypes.LoadAccountsAction),
    mergeMap(action =>
      this.accountService.getAccounts().pipe(
        switchMap((res: any) => {
          return [new LoadAccountsSuccess(res.msg)];
        }),
        catchError(err => of(new LoadAccountsFailure()))
      )
    )
  );

  @Effect() public addAccounts$: Observable<Action> = this.actions$.pipe(
    ofType<AddAccount>(AccountActionTypes.AddAccountAction),
    mergeMap(action =>
      this.accountService.addAccount({cookie: action.cookie, user: action.user}).pipe(
        switchMap((account: AccountModel) => {
          return [new AddAccountSuccess(account)];
        }),
        catchError(err => of(new AddAccountFailure()))
      )
    )
  );
  constructor(
    private actions$: Actions,
    private accountService: AccountService
  ) {}
}
