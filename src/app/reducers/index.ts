import { ActionReducerMap, MetaReducer } from "@ngrx/store";

import * as fromAccount from "./account.reducer";
import * as fromLayout from "./layout.reducer";
import * as fromInstagram from "./instagram.reducer";

export interface AppState {
  accounts: fromAccount.State;
  layouts: fromLayout.State;
  instagram: fromInstagram.State;
}

export const reducers: ActionReducerMap<AppState> = {
  accounts: fromAccount.reducer,
  layouts: fromLayout.reducer,
  instagram: fromInstagram.reducer
};

export const metaReducers: MetaReducer<AppState>[] = [];
