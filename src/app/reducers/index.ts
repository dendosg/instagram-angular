import { ActionReducerMap, MetaReducer } from "@ngrx/store";

import * as fromAccount from "./account.reducer";

export interface AppState {
  accounts: fromAccount.State;
}

export const reducers: ActionReducerMap<AppState> = {
  accounts: fromAccount.reducer
};

export const metaReducers: MetaReducer<AppState>[] = [];
