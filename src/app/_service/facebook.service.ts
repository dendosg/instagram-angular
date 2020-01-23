import { HttpClient } from "@angular/common/http";
import { Constants } from "./../utils/Constants";
import Axios from "axios";
import { Injectable } from "@angular/core";
import { endPoints } from "app/utils/routes.constant";
import { get } from "lodash";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class FacebookService {
  constructor(private httpClient: HttpClient) {}

  public searchPlace({
    access_token,
    keyword,
    after
  }: {
    access_token: string;
    keyword: string;
    after?: string;
  }) {
    return Axios({
      method: "post",
      url: Constants.baseApiUrl,
      data: {
        after,
        access_token,
        input: keyword,
        type: "SEARCH_PLACE_FACEBOOK"
      }
    });
  }
  public getPostsOfPage({ access_token, keyword, after }) {
    return Axios({
      method: "post",
      url: Constants.baseApiUrl,
      data: {
        after,
        access_token,
        input: keyword,
        type: "GET_POSTS_PAGE_FACEBOOK"
      }
    });
  }

  public getPostLikesCount(postId: string, access_token: string) {
    return this._getPostField(postId, access_token, endPoints.postLikesCount);
  }

  public getPostCommentsCount(postId: string, access_token: string) {
    return this._getPostField(
      postId,
      access_token,
      endPoints.postCommentsCount
    );
  }

  public getPostSharesCount(postId: string, access_token: string) {
    return this._getPostField(postId, access_token, endPoints.postSharesCount);
  }

  public getGroupJoined(userId: string) {
    return this.httpClient.get(
      endPoints.groupJoined.replace(":userId", userId)
    );
  }

  public getPageLiked(userId: string){
    return this.httpClient.get(endPoints.pageLiked.replace(":userId", userId));
  }
  private _getPostField(
    postId: string,
    access_token: string,
    endPoint: string
  ) {
    return this.httpClient
      .get(
        endPoint
          .replace(":postId", postId)
          .replace(":accessToken", access_token)
      )
      .pipe(map(res => get(res, "summary.total_count") || get(res, "shares.count")))
  }
}
