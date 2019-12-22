import { Action } from "@ngrx/store";
import { APP_ROUTES, CONTEXT_SEARCH } from "app/utils/Constants";
import { UserFromApi, UserModel } from "model/user.model";
import { HashtagModel } from "model/hashtag.model";
import { PlaceModel } from "model/place.model";
import { CommentModel } from "model/comment.model";

export enum InstagramActionTypes {
  SearchAction = "[Instagram] Search",
  SearchSuccessAction = "[Instagram] Search Success",
  SearchFailureAction = "[Instagram] Search Failure",

  GetLikeAction = "[Instagram] Get Like",
  GetLikeSuccessAction = "[Instagram] Get Like Success",
  GetLikeFailureAction = "[Instagram] Get Like Failure",

  GetCommentAction = "[Instagram] Get Comment",
  GetCommentSuccessAction = "[Instagram] Get Comment Success",
  GetCommentFailureAction = "[Instagram] Get Comment Failure",

  GetFollowerAction = "[Instagram] Get Followers",
  GetFollowerSuccessAction = "[Instagram] Get Followers Success",
  GetFollowerFailureAction = "[Instagram] Get Followers Failure",

  GetFollowingAction = "[Instagram] Get Following",
  GetFollowingSuccessAction = "[Instagram] Get Following Success",
  GetFollowingFailureAction = "[Instagram] Get Following Failure",
}

export class Search implements Action {
  public readonly type = InstagramActionTypes.SearchAction;
  constructor(
    public keyword: string,
    public cookie: string,
    public context: CONTEXT_SEARCH
  ) {}
}

export class SearchSuccess implements Action {
  public readonly type = InstagramActionTypes.SearchSuccessAction;
  constructor(
    public results: UserFromApi[] | HashtagModel[] | PlaceModel[],
    public context: CONTEXT_SEARCH
  ) {}
}

export class SearchFailure implements Action {
  public readonly type = InstagramActionTypes.SearchFailureAction;
}

export class GetLike implements Action {
  public readonly type = InstagramActionTypes.GetLikeAction;
  constructor(
    public keyword: string,
    public cookie: string,
    public after?: string
  ) {}
}

export class GetLikeSuccess implements Action {
  public readonly type = InstagramActionTypes.GetLikeSuccessAction;
  constructor(public results: UserModel[], public count: number) {}
}

export class GetLikeFailure implements Action {
  public readonly type = InstagramActionTypes.GetLikeFailureAction;
}

export class GetComment implements Action {
  public readonly type = InstagramActionTypes.GetCommentAction;
  constructor(
    public keyword: string,
    public cookie: string,
    public after?: string
  ) {}
}

export class GetCommentSuccess implements Action {
  public readonly type = InstagramActionTypes.GetCommentSuccessAction;
  constructor(public results: CommentModel[], public count: number) {}
}

export class GetCommentFailure implements Action {
  public readonly type = InstagramActionTypes.GetCommentFailureAction;
}

export class GetFollower implements Action {
  public readonly type = InstagramActionTypes.GetFollowerAction;
  constructor(
    public keyword: string,
    public cookie: string,
    public after?: string
  ) {}
}

export class GetFollowerSuccess implements Action {
  public readonly type = InstagramActionTypes.GetFollowerSuccessAction;
  constructor(public results: UserModel[], public count: number) {}
}

export class GetFollowerFailure implements Action {
  public readonly type = InstagramActionTypes.GetFollowerFailureAction;
}

export class GetFollowing implements Action {
  public readonly type = InstagramActionTypes.GetFollowingAction;
  constructor(
    public keyword: string,
    public cookie: string,
    public after?: string
  ) {}
}

export class GetFollowingSuccess implements Action {
  public readonly type = InstagramActionTypes.GetFollowingSuccessAction;
  constructor(public results: UserModel[], public count: number) {}
}

export class GetFollowingFailure implements Action {
  public readonly type = InstagramActionTypes.GetFollowingFailureAction;
}
export type InstagramActionsUnion =
  | Search
  | SearchSuccess
  | SearchFailure
  | GetLike
  | GetLikeSuccess
  | GetLikeFailure
  | GetComment
  | GetCommentSuccess
  | GetCommentFailure
  | GetFollower
  | GetFollowerSuccess
  | GetFollowerFailure
  | GetFollowing
  | GetFollowingSuccess
  | GetFollowingFailure
