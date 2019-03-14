import { Injectable } from "@angular/core";
import Axios from "axios";
import { Constants } from "../utils/Constants";

@Injectable({
  providedIn: "root"
})
export class InstagramService {
  constructor() {}
  public getMyProfile({ cookie }) {
    return this.commonRequest({
      cookie,
      type: Constants.typeRequest.GET_MY_PROFILE
    });
  }

  public getComment({ cookie, shortcode, after = null }) {
    return this.commonRequest({
      cookie,
      input: shortcode,
      type: Constants.typeRequest.GET_COMMENT,
      after
    });
  }

  public getFollower({ cookie, userId, after = null }) {
    return this.commonRequest({
      cookie,
      input: userId,
      type: Constants.typeRequest.GET_FOLLOWER,
      after
    });
  }

  public getFollowing({ cookie, userId, after = null }) {
    return this.commonRequest({
      cookie,
      input: userId,
      type: Constants.typeRequest.GET_FOLLOWING,
      after
    });
  }

  public getMediaOfUser({ cookie, userId, after = null }) {
    return this.commonRequest({
      cookie,
      input: userId,
      type: Constants.typeRequest.GET_MEDIA_OF_USER,
      after
    });
  }

  public commonRequest({ cookie, input = null, type, after = null }) {
    return Axios({
      method: "post",
      url: Constants.baseApiUrl,
      data: {
        type,
        input,
        after,
        cookie
      }
    });
  }
}
