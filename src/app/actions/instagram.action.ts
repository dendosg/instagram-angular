import { Action } from "@ngrx/store";
import { APP_ROUTES, CONTEXT_SEARCH } from "app/utils/Constants";
import { UserFromApi, UserModel } from "model/user.model";
import { HashtagModel } from "model/hashtag.model";
import { PlaceModel } from "model/place.model";
import { CommentModel } from "model/comment.model";
import { MediaModel } from "model/media.model";

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

  GetMediaInfoAction = "[Instagram] Get Media Info",
  GetMediaInfoSuccessAction = "[Instagram] Get Media Info Success",
  GetMediaInfoFailureAction = "[Instagram] Get Media Info Failure",
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

export class GetMediaInfo implements Action {
  public readonly type = InstagramActionTypes.GetMediaInfoAction;
  constructor(
    public keyword: string,
    public cookie: string,
  ) {}
}

export class GetMediaInfoSuccess implements Action {
  public readonly type = InstagramActionTypes.GetMediaInfoSuccessAction;
  constructor(public media: MediaModel) {}
}

export class GetMediaInfoFailure implements Action {
  public readonly type = InstagramActionTypes.GetMediaInfoFailureAction;
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
  | GetMediaInfo
  | GetMediaInfoSuccess
  | GetMediaInfoFailure
