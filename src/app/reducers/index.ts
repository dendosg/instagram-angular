import { ActionReducerMap, MetaReducer } from "@ngrx/store";

import * as fromAccount from "./account.reducer";
import * as fromLayout from "./layout.reducer";

export interface AppState {
  accounts: fromAccount.State;
  layouts: fromLayout.State;
}

export const reducers: ActionReducerMap<AppState> = {
  accounts: fromAccount.reducer,
  layouts: fromLayout.reducer
};

export const metaReducers: MetaReducer<AppState>[] = [];
