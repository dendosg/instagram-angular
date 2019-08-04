import { Constants } from "./../utils/Constants";
import Axios from "axios";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class FacebookService {
  constructor() {}

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
  public getPostsOfPage({
    access_token,
    keyword,
    after
  }){
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
}
