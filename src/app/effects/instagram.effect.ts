import { CONTEXT_SEARCH } from "./../utils/Constants";
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
  GetLikeFailure
} from "app/actions/instagram.action";
import { InstagramService } from "app/_service/instagram.service";
import { UserModel, UserFromApi } from "model/user.model";
import { HashtagModel } from "model/hashtag.model";
import { PlaceModel } from "model/place.model";
import { AppState } from "app/reducers";
import { NzMessageService } from "ng-zorro-antd";

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

  @Effect() public alert$: Observable<Action> = this.actions$.pipe(
    ofType<SearchFailure>(InstagramActionTypes.SearchFailureAction),
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
