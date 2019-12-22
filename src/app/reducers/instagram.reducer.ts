import { getCurrentRouteSelector, getOptionSelector } from "./layout.reducer";
import { Action, createFeatureSelector, createSelector } from "@ngrx/store";

import {
  LayoutActionsUnion,
  LayoutActionTypes
} from "app/actions/layout.action";
import {
  InstagramActionsUnion,
  InstagramActionTypes
} from "app/actions/instagram.action";
import { APP_ROUTES, CONTEXT_SEARCH } from "app/utils/Constants";
import { HashtagModel } from "model/hashtag.model";
import { PlaceModel } from "model/place.model";
import { UserModel } from "model/user.model";
import * as fromLayout from "./layout.reducer";
export interface State {
  keywords: {
    [key: string]: string[];
  };
  results: {
    [APP_ROUTES.SEARCH]: {
      [CONTEXT_SEARCH.USER]: UserModel[];
      [CONTEXT_SEARCH.HASHTAG]: HashtagModel[];
      [CONTEXT_SEARCH.PLACE]: PlaceModel[];
    };
    [APP_ROUTES.GET_LIKE]: UserModel[];
  };
  count: {
    [key: string]: number
  }
}
export const initialState: State = {
  keywords: {
    [APP_ROUTES.SEARCH]: [],
    [APP_ROUTES.GET_LIKE]: []
  },
  results: {
    [APP_ROUTES.SEARCH]: {
      [CONTEXT_SEARCH.USER]: [],
      [CONTEXT_SEARCH.HASHTAG]: [],
      [CONTEXT_SEARCH.PLACE]: []
    },
    [APP_ROUTES.GET_LIKE]: []
  },
  count: {}
};

export function reducer(
  state = initialState,
  action: InstagramActionsUnion | LayoutActionsUnion
): State {
  switch (action.type) {
    case LayoutActionTypes.SetCurrentInputTextAction:
      return {
        ...state,
        keywords: {
          ...state.keywords,
          [action.currentRoute]: action.inputText.split("\n").filter(Boolean)
        }
      };
    case InstagramActionTypes.GetLikeAction:
    case InstagramActionTypes.SearchAction:
      return {
        ...state,
        keywords: {
          ...state.keywords,
          [APP_ROUTES.SEARCH]: state.keywords[APP_ROUTES.SEARCH].filter(
            item => item !== action.keyword
          ),
          [APP_ROUTES.GET_LIKE]: state.keywords[APP_ROUTES.GET_LIKE].filter(
            item => item !== action.keyword
          )
        }
      };
    case InstagramActionTypes.SearchSuccessAction:
      return {
        ...state,
        results: {
          ...state.results,
          [APP_ROUTES.SEARCH]: {
            ...state.results[APP_ROUTES.SEARCH],
            [action.context]: state.results[APP_ROUTES.SEARCH][
              action.context
            ].concat(action.results)
          }
        }
      };
    case InstagramActionTypes.GetLikeSuccessAction:
      return {
        ...state,
        results: {
          ...state.results,
          [APP_ROUTES.GET_LIKE]: [
            ...state.results[APP_ROUTES.GET_LIKE],
            ...action.results
          ]
        },
        count: {
          ...state.count,
          [APP_ROUTES.GET_LIKE]: action.count
        }
      };
    default:
      return state;
  }
}
export const getInstagramFeatureState = createFeatureSelector<State>(
  "instagram"
);

export const getKeywordsSelector = createSelector(
  getInstagramFeatureState,
  getCurrentRouteSelector,
  (state: State, currentRoute) => state.keywords[currentRoute]
);

export const getResultsSelector = createSelector(
  getInstagramFeatureState,
  getCurrentRouteSelector,
  getOptionSelector,
  (state: State, currentRoute, option) => {
    if (currentRoute === APP_ROUTES.SEARCH)
      return state.results[currentRoute][option.contextSearch];
    return state.results[currentRoute];
  }
);
