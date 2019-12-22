import { CommentFromApi } from "./../../model/comment.model";
import { CONTEXT_SEARCH, GET_MEDIA_TYPE } from "./../utils/Constants";
import { getKeywordsSelector } from "./../reducers/instagram.reducer";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, filter, map, mergeMap, switchMap } from "rxjs/operators";

import {
  Search,
  InstagramActionTypes,
  SearchSuccess,
  SearchFailure,
  GetLike,
  GetLikeSuccess,
  GetLikeFailure,
  GetComment,
  GetCommentSuccess,
  GetFollower,
  GetFollowerFailure,
  GetFollowerSuccess,
  GetFollowing,
  GetFollowingSuccess,
  GetFollowingFailure,
  GetMediaInfo,
  GetMediaInfoFailure,
  GetMediaInfoSuccess,
  GetUserInfo,
  GetUserInfoSuccess,
  GetUserInfoFailure,
  GetMedia,
  GetMediaSuccess,
  GetMediaFailure
} from "app/actions/instagram.action";
import { InstagramService } from "app/_service/instagram.service";
import { UserModel, UserFromApi } from "model/user.model";
import { HashtagModel } from "model/hashtag.model";
import { PlaceModel } from "model/place.model";
import { AppState } from "app/reducers";
import { NzMessageService } from "ng-zorro-antd";
import { CommentModel } from "model/comment.model";
import { MediaFromApi, MediaModel } from "model/media.model";

@Injectable()
export class InstagramEffects {
  @Effect() public search$: Observable<Action> = this.actions$.pipe(
    ofType<Search>(InstagramActionTypes.SearchAction),
    mergeMap(action =>
      this.instagramService
        .search({
          cookie: action.cookie,
          query: action.keyword,
          context: action.context
        })
        .pipe(
          switchMap((results: any[]) => {
            let data;
            if (action.context === CONTEXT_SEARCH.USER)
              data = results.map(item => new UserModel(item));
            if (action.context === CONTEXT_SEARCH.HASHTAG)
              data = results.map(item => new HashtagModel(item));
            if (action.context === CONTEXT_SEARCH.PLACE)
              data = results.map(item => new PlaceModel(item));
            const tasks = [
              new SearchSuccess(data, action.context),
              ...(this.keywords[0]
                ? [new Search(this.keywords[0], action.cookie, action.context)]
                : [])
            ];
            return tasks;
          }),
          catchError(err => of(new SearchFailure()))
        )
    )
  );

  @Effect() public getMedia$: Observable<Action> = this.actions$.pipe(
    ofType<GetMedia>(InstagramActionTypes.GetMediaAction),
    mergeMap(action => {
      let request;
      switch (action.getMediaOf) {
        case GET_MEDIA_TYPE.USER:
          const param = {
            cookie: action.cookie,
            userId: action.keyword,
            after: action.after
          };
          request = this.instagramService.getMediaOfUser(param);
          if (action.isGetTaggedMedia) {
            request = this.instagramService.getMediaTaggedOfUser(param);
          }
          break;
        case GET_MEDIA_TYPE.HASHTAG:
          request = this.instagramService.getMediaOfHashtag({
            cookie: action.cookie,
            tag_name: action.keyword,
            after: action.after
          });
          if (action.isGetTopMedia) {
            request = this.instagramService.getTopMediaOfHashtag({
              cookie: action.cookie,
              tag_name: action.keyword
            });
          }
          break;
        case GET_MEDIA_TYPE.LOCATION:
          request = this.instagramService.getMediaOfLocation({
            cookie: action.cookie,
            locationId: action.keyword,
            after: action.after
          });
          if (action.isGetTopMedia) {
            request = this.instagramService.getTopMediaOfLocation({
              cookie: action.cookie,
              locationId: action.keyword
            });
          }
          break;
        default:
          break;
      }

      return request.pipe(
        switchMap(
          ({
            count,
            data,
            page_info
          }: {
            count: number;
            data: MediaFromApi[];
            page_info: { has_next_page: boolean; end_cursor?: string };
          }) => {
            console.log("data", data);
            const media = data.map(m => new MediaModel(m));
            const tasks = [
              new GetMediaSuccess(media, action.getMediaOf, count),
              ...(page_info && page_info.end_cursor
                ? [
                    new GetMedia(
                      action.keyword,
                      action.cookie,
                      action.getMediaOf,
                      page_info.end_cursor,
                      action.isGetTaggedMedia
                    )
                  ]
                : this.keywords[0]
                ? [
                    new GetMedia(
                      this.keywords[0],
                      action.cookie,
                      action.getMediaOf,
                      undefined,
                      action.isGetTaggedMedia,
                      action.isGetTopMedia
                    )
                  ]
                : [])
            ];
            return tasks;
          }
        ),
        catchError(err => {
          console.log("err", err);
          return of(new GetMediaFailure());
        })
      );
    })
  );

  @Effect() public getLike$: Observable<Action> = this.actions$.pipe(
    ofType<GetLike>(InstagramActionTypes.GetLikeAction),
    mergeMap(action =>
      this.instagramService
        .getLikerOfMedia({
          cookie: action.cookie,
          shortcode: action.keyword,
          after: action.after
        })
        .pipe(
          switchMap(
            ({
              count,
              data,
              page_info
            }: {
              count: number;
              data: UserFromApi[];
              page_info: { has_next_page: boolean; end_cursor: string };
            }) => {
              const users = data.map(user => new UserModel(user));
              const tasks = [
                new GetLikeSuccess(users, count),
                ...(page_info.end_cursor
                  ? [
                      new GetLike(
                        action.keyword,
                        action.cookie,
                        page_info.end_cursor
                      )
                    ]
                  : [])
              ];
              return tasks;
            }
          ),
          catchError(err => of(new GetLikeFailure()))
        )
    )
  );

  @Effect() public getComment$: Observable<Action> = this.actions$.pipe(
    ofType<GetComment>(InstagramActionTypes.GetCommentAction),
    mergeMap(action =>
      this.instagramService
        .getComment({
          cookie: action.cookie,
          shortcode: action.keyword,
          after: action.after
        })
        .pipe(
          switchMap(
            ({
              count,
              data,
              page_info
            }: {
              count: number;
              data: CommentFromApi[];
              page_info: { has_next_page: boolean; end_cursor: string };
            }) => {
              const comments = data.map(c => new CommentModel(c));
              const tasks = [
                new GetCommentSuccess(comments, count),
                ...(page_info.end_cursor
                  ? [
                      new GetComment(
                        action.keyword,
                        action.cookie,
                        page_info.end_cursor
                      )
                    ]
                  : [])
              ];
              return tasks;
            }
          ),
          catchError(err => of(new GetLikeFailure()))
        )
    )
  );

  @Effect() public getFollower$: Observable<Action> = this.actions$.pipe(
    ofType<GetFollower>(InstagramActionTypes.GetFollowerAction),
    mergeMap(action =>
      this.instagramService
        .getFollower({
          cookie: action.cookie,
          userId: action.keyword,
          after: action.after
        })
        .pipe(
          switchMap(
            ({
              count,
              data,
              page_info
            }: {
              count: number;
              data: UserFromApi[];
              page_info: { has_next_page: boolean; end_cursor: string };
            }) => {
              const followers = data.map(f => new UserModel(f));
              const tasks = [
                new GetFollowerSuccess(followers, count),
                ...(page_info.end_cursor
                  ? [
                      new GetFollower(
                        action.keyword,
                        action.cookie,
                        page_info.end_cursor
                      )
                    ]
                  : [])
              ];
              return tasks;
            }
          ),
          catchError(err => of(new GetFollowerFailure()))
        )
    )
  );

  @Effect() public getFollowing$: Observable<Action> = this.actions$.pipe(
    ofType<GetFollowing>(InstagramActionTypes.GetFollowingAction),
    mergeMap(action =>
      this.instagramService
        .getFollowing({
          cookie: action.cookie,
          userId: action.keyword,
          after: action.after
        })
        .pipe(
          switchMap(
            ({
              count,
              data,
              page_info
            }: {
              count: number;
              data: UserFromApi[];
              page_info: { has_next_page: boolean; end_cursor: string };
            }) => {
              const followers = data.map(f => new UserModel(f));
              const tasks = [
                new GetFollowingSuccess(followers, count),
                ...(page_info.end_cursor
                  ? [
                      new GetFollowing(
                        action.keyword,
                        action.cookie,
                        page_info.end_cursor
                      )
                    ]
                  : [])
              ];
              return tasks;
            }
          ),
          catchError(err => of(new GetFollowingFailure()))
        )
    )
  );

  @Effect() public getMediaInfo$: Observable<Action> = this.actions$.pipe(
    ofType<GetMediaInfo>(InstagramActionTypes.GetMediaInfoAction),
    mergeMap(action =>
      this.instagramService
        .getMediaInfo({ cookie: action.cookie, shortcode: action.keyword })
        .pipe(
          switchMap((media: MediaFromApi) => {
            return [new GetMediaInfoSuccess(new MediaModel(media))];
          }),
          catchError(err => of(new GetMediaInfoFailure()))
        )
    )
  );

  @Effect() public getUserInfo$: Observable<Action> = this.actions$.pipe(
    ofType<GetUserInfo>(InstagramActionTypes.GetUserInfoAction),
    mergeMap(action => {
      let request = this.instagramService.getUserByUsername({
        cookie: action.cookie,
        username: action.keyword
      });
      if (Number(action.keyword))
        request = this.instagramService.getUserById({
          cookie: action.cookie,
          userId: action.keyword
        });
      return request.pipe(
        switchMap((user: UserFromApi) => {
          return [new GetUserInfoSuccess(new UserModel(user))];
        }),
        catchError(err => {
          console.log("err", err);
          return of(new GetUserInfoFailure());
        })
      );
    })
  );
  @Effect() public alert$: Observable<Action> = this.actions$.pipe(
    ofType<SearchFailure | GetMediaFailure>(
      InstagramActionTypes.SearchFailureAction,
      InstagramActionTypes.GetMediaFailureAction
    ),
    mergeMap(action => {
      this.message.error("Something wrong");
      return [];
    })
  );
  private keywords: string[];
  constructor(
    private actions$: Actions,
    private instagramService: InstagramService,
    private store: Store<AppState>,
    private message: NzMessageService
  ) {
    this.store
      .pipe(select(getKeywordsSelector))
      .subscribe(keywords => (this.keywords = keywords));
  }
}
