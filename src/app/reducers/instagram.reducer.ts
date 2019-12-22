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
import {
  APP_ROUTES,
  CONTEXT_SEARCH,
  GET_MEDIA_TYPE
} from "app/utils/Constants";
import { HashtagModel } from "model/hashtag.model";
import { PlaceModel } from "model/place.model";
import { UserModel } from "model/user.model";
import { CommentModel } from "model/comment.model";
import { MediaModel } from "model/media.model";
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
    [APP_ROUTES.GET_MEDIA]: {
      [GET_MEDIA_TYPE.USER]: MediaModel[];
      [GET_MEDIA_TYPE.HASHTAG]: MediaModel[];
      [GET_MEDIA_TYPE.LOCATION]: MediaModel[];
    };
    [APP_ROUTES.GET_LIKE]: UserModel[];
    [APP_ROUTES.GET_COMMENT]: CommentModel[];
    [APP_ROUTES.GET_FOLLOWER]: UserModel[];
    [APP_ROUTES.GET_FOLLOWING]: UserModel[];
    [APP_ROUTES.GET_MEDIA_INFO]: MediaModel[];
    [APP_ROUTES.GET_USER_INFO]: UserModel[];
  };
  count: {
    [key: string]: number;
  };
}
export const initialState: State = {
  keywords: {
    [APP_ROUTES.SEARCH]: [],
    [APP_ROUTES.GET_MEDIA]: [],
    [APP_ROUTES.GET_LIKE]: [],
    [APP_ROUTES.GET_COMMENT]: [],
    [APP_ROUTES.GET_FOLLOWER]: [],
    [APP_ROUTES.GET_FOLLOWING]: [],
    [APP_ROUTES.GET_MEDIA_INFO]: [],
    [APP_ROUTES.GET_USER_INFO]: []
  },
  results: {
    [APP_ROUTES.SEARCH]: {
      [CONTEXT_SEARCH.USER]: [],
      [CONTEXT_SEARCH.HASHTAG]: [],
      [CONTEXT_SEARCH.PLACE]: []
    },
    [APP_ROUTES.GET_MEDIA]: {
      [GET_MEDIA_TYPE.USER]: [],
      [GET_MEDIA_TYPE.HASHTAG]: [],
      [GET_MEDIA_TYPE.LOCATION]: []
    },
    [APP_ROUTES.GET_LIKE]: [],
    [APP_ROUTES.GET_COMMENT]: [],
    [APP_ROUTES.GET_FOLLOWER]: [],
    [APP_ROUTES.GET_FOLLOWING]: [],
    [APP_ROUTES.GET_MEDIA_INFO]: [],
    [APP_ROUTES.GET_USER_INFO]: []
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
    case InstagramActionTypes.GetCommentAction:
    case InstagramActionTypes.GetFollowerAction:
    case InstagramActionTypes.GetFollowingAction:
    case InstagramActionTypes.GetMediaInfoAction:
    case InstagramActionTypes.GetUserInfoAction:
    case InstagramActionTypes.GetMediaAction:
    case InstagramActionTypes.SearchAction:
      return {
        ...state,
        keywords: {
          ...state.keywords,
          [APP_ROUTES.SEARCH]: state.keywords[APP_ROUTES.SEARCH].filter(
            item => item !== action.keyword
          ),
          [APP_ROUTES.GET_MEDIA]: state.keywords[APP_ROUTES.GET_MEDIA].filter(
            item => item !== action.keyword
          ),
          [APP_ROUTES.GET_LIKE]: state.keywords[APP_ROUTES.GET_LIKE].filter(
            item => item !== action.keyword
          ),
          [APP_ROUTES.GET_COMMENT]: state.keywords[
            APP_ROUTES.GET_COMMENT
          ].filter(item => item !== action.keyword),
          [APP_ROUTES.GET_FOLLOWER]: state.keywords[
            APP_ROUTES.GET_FOLLOWER
          ].filter(item => item !== action.keyword),
          [APP_ROUTES.GET_FOLLOWING]: state.keywords[
            APP_ROUTES.GET_FOLLOWING
          ].filter(item => item !== action.keyword),
          [APP_ROUTES.GET_MEDIA_INFO]: state.keywords[
            APP_ROUTES.GET_MEDIA_INFO
          ].filter(item => item !== action.keyword),
          [APP_ROUTES.GET_USER_INFO]: state.keywords[
            APP_ROUTES.GET_USER_INFO
          ].filter(item => item !== action.keyword)
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
    case InstagramActionTypes.GetMediaSuccessAction:
      return {
        ...state,
        results: {
          ...state.results,
          [APP_ROUTES.GET_MEDIA]: {
            ...state.results[APP_ROUTES.GET_MEDIA],
            [action.getMediaOf]: state.results[APP_ROUTES.GET_MEDIA][
              action.getMediaOf
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
    case InstagramActionTypes.GetCommentSuccessAction:
      return {
        ...state,
        results: {
          ...state.results,
          [APP_ROUTES.GET_COMMENT]: [
            ...state.results[APP_ROUTES.GET_COMMENT],
            ...action.results
          ]
        },
        count: {
          ...state.count,
          [APP_ROUTES.GET_COMMENT]: action.count
        }
      };

    case InstagramActionTypes.GetFollowerSuccessAction:
      return {
        ...state,
        results: {
          ...state.results,
          [APP_ROUTES.GET_FOLLOWER]: [
            ...state.results[APP_ROUTES.GET_FOLLOWER],
            ...action.results
          ]
        },
        count: {
          ...state.count,
          [APP_ROUTES.GET_FOLLOWER]: action.count
        }
      };

    case InstagramActionTypes.GetFollowingSuccessAction:
      return {
        ...state,
        results: {
          ...state.results,
          [APP_ROUTES.GET_FOLLOWING]: [
            ...state.results[APP_ROUTES.GET_FOLLOWING],
            ...action.results
          ]
        },
        count: {
          ...state.count,
          [APP_ROUTES.GET_FOLLOWING]: action.count
        }
      };
    case InstagramActionTypes.GetMediaInfoSuccessAction:
      return {
        ...state,
        results: {
          ...state.results,
          [APP_ROUTES.GET_MEDIA_INFO]: [
            ...state.results[APP_ROUTES.GET_MEDIA_INFO],
            action.media
          ]
        }
      };

    case InstagramActionTypes.GetUserInfoSuccessAction:
      return {
        ...state,
        results: {
          ...state.results,
          [APP_ROUTES.GET_USER_INFO]: [
            ...state.results[APP_ROUTES.GET_USER_INFO],
            action.user
          ]
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
    if (currentRoute === APP_ROUTES.GET_MEDIA)
      return state.results[currentRoute][option.getMediaOf];
    return state.results[currentRoute];
  }
);
