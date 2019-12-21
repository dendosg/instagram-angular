import { Action, createFeatureSelector, createSelector } from "@ngrx/store";
import {
  AccountActionsUnion,
  AccountActionTypes
} from "app/actions/account.action";
import { AccountModel } from "model/account.model";

export interface State {
  entities: AccountModel[];
  loading: boolean;
}
export const initialState: State = {
  entities: [],
  loading: false
};


export function reducer(
  state = initialState,
  action: AccountActionsUnion
): State {
  switch (action.type) {
    case AccountActionTypes.LoadAccountsAction:
      return {
        ...state,
        loading: true
      };
    case AccountActionTypes.LoadAccountsSuccessAction:
      return {
        ...state,
        loading: false,
        entities: action.accounts
      };
    case AccountActionTypes.AddAccountSuccessAction:
      return {
        ...state,
        entities: [...state.entities, action.account]
      }
    default:
      return state;
  }
}
export const getAccountsFeatureState = createFeatureSelector<State>("accounts");
export const getAccountsSelector = createSelector(
  getAccountsFeatureState,
  (state: State) => {
    if (!state) return [];
    return state.entities;
  }
);
