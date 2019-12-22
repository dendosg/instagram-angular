import { Action } from "@ngrx/store";
import { APP_ROUTES, CONTEXT_SEARCH } from "app/utils/Constants";
import { UserFromApi, UserModel } from "model/user.model";
import { HashtagModel } from "model/hashtag.model";
import { PlaceModel } from "model/place.model";

export enum InstagramActionTypes {
  SearchAction = "[Instagram] Search",
  SearchSuccessAction = "[Instagram] Search Success",
  SearchFailureAction = "[Instagram] Search Failure",

  GetLikeAction = "[Instagram] Get Like",
  GetLikeSuccessAction = "[Instagram] Get Like Success",
  GetLikeFailureAction = "[Instagram] Get Like Failure"
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
  ) {
    // this.after = null
  }
}

export class GetLikeSuccess implements Action {
  public readonly type = InstagramActionTypes.GetLikeSuccessAction;
  constructor(public results: UserModel[], public count: number) {}
}

export class GetLikeFailure implements Action {
  public readonly type = InstagramActionTypes.GetLikeFailureAction;
}
export type InstagramActionsUnion =
  | Search
  | SearchSuccess
  | SearchFailure
  | GetLike
  | GetLikeSuccess
  | GetLikeFailure;
