import { Action, createFeatureSelector, createSelector } from "@ngrx/store";

import {
  APP_ROUTES,
  GET_MEDIA_TYPE,
  CONTEXT_SEARCH
} from "app/utils/Constants";
import {
  LayoutActionsUnion,
  LayoutActionTypes
} from "app/actions/layout.action";

export interface State {
  currentRoute: APP_ROUTES;
  option: {
    getMediaOf: GET_MEDIA_TYPE;
    contextSearch: CONTEXT_SEARCH;
    isGetTopMedia: boolean;
    isGetTaggedMedia: boolean;
    isProfile: boolean;
  };
  inputText: {
    [key: string]: string;
  };
}
export const initialState: State = {
  currentRoute: APP_ROUTES.SEARCH,
  option: {
    getMediaOf: GET_MEDIA_TYPE.HASHTAG,
    contextSearch: CONTEXT_SEARCH.HASHTAG,
    isGetTopMedia: false,
    isGetTaggedMedia: false,
    isProfile: false
  },
  inputText: {}
};

export function reducer(
  state = initialState,
  action: LayoutActionsUnion
): State {
  switch (action.type) {
    case LayoutActionTypes.SetCurrentRouteAction:
      return {
        ...state,
        currentRoute: action.currentRoute
      };
    case LayoutActionTypes.SetCurrentInputTextAction:
      return {
        ...state,
        inputText: {
          ...state.inputText,
          [action.currentRoute]: action.inputText
        }
      };
    default:
      return state;
  }
}
export const getLayoutsFeatureState = createFeatureSelector<State>("layouts");

export const getCurrentRouteSelector = createSelector(
  getLayoutsFeatureState,
  (state: State) => {
    return state.currentRoute;
  }
);

export const getOptionSelector = createSelector(
  getLayoutsFeatureState,
  (state: State) => {
    return state.option;
  }
);

export const getInputSelector = createSelector(
  getLayoutsFeatureState,
  getCurrentRouteSelector,
  (state: State, currentRoute: APP_ROUTES) => {
    return state.inputText[currentRoute];
  }
);
