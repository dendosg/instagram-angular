import { Injectable } from "@angular/core";
import Axios from "axios";
import { Constants } from "../utils/Constants";

@Injectable({
  providedIn: "root"
})
export class InstagramService {
  constructor() { }
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

  public getUserByUsername({ cookie, username }) {
    return this.commonRequest({
      cookie,
      input: username,
      type: Constants.typeRequest.GET_USER_BY_USERNAME
    });
  }

  public getUserById({ cookie, userId }) {
    return this.commonRequest({
      cookie,
      input: userId,
      type: Constants.typeRequest.GET_USER_BY_ID
    });
  }

  public getMedia({ cookie, shortcode }) {
    return this.commonRequest({
      cookie,
      input: shortcode,
      type: Constants.typeRequest.GET_MEDIA
    });
  }

  public getLikerOfMedia({ cookie, shortcode, after = null }) {
    return this.commonRequest({
      cookie,
      input: shortcode,
      type: Constants.typeRequest.GET_LIKE
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

  public getMediaTaggedOfUser({ cookie, userId, after = null }) {
    return this.commonRequest({
      cookie,
      input: userId,
      type: Constants.typeRequest.GET_MEDIA_TAGGED_OF_USER,
      after
    });
  }

  public getHashtagInfo({ cookie, hashtag }) {
    return this.commonRequest({
      cookie,
      input: hashtag,
      type: Constants.typeRequest.GET_HASHTAG_INFO
    });
  }

  public getMediaOfHashtag({ cookie, tag_name, after = null }) {
    return this.commonRequest({
      cookie,
      input: tag_name,
      type: Constants.typeRequest.GET_MEDIA_OF_HASHTAG,
      after
    });
  }

  public getTopMediaOfHashtag({ cookie, tag_name }) {
    return this.commonRequest({
      cookie,
      input: tag_name,
      type: Constants.typeRequest.GET_TOP_MEDIA_OF_HASHTAG
    });
  }

  public getLocationInfo({ cookie, locationId }) {
    return this.commonRequest({
      cookie,
      input: locationId,
      type: Constants.typeRequest.GET_LOCATION_INFO
    });
  }

  public getMediaOfLocation({ cookie, locationId, after = null }) {
    return this.commonRequest({
      cookie,
      input: locationId,
      type: Constants.typeRequest.GET_MEDIA_OF_LOCATION,
      after
    });
  }

  public getTopMediaOfLocation({ cookie, locationId }) {
    return this.commonRequest({
      cookie,
      input: locationId,
      type: Constants.typeRequest.GET_TOP_MEDIA_OF_LOCATION
    });
  }

  public locationSearch({ cookie, query, latitude, longitude }) {
    return Axios({
      method: "post",
      url: Constants.baseApiUrl,
      data: {
        type: Constants.typeRequest.LOCATION_SEARCH,
        input: query,
        cookie,
        latitude,
        longitude
      }
    });
  }

  public search({ cookie, query, context }) {
    return Axios({
      method: 'post',
      url: Constants.baseApiUrl,
      data: {
        type: Constants.typeRequest.SEARCH,
        input: query,
        context,
        cookie
      }
    })
  }

  public getMyStories({ cookie }) {
    return this.commonRequest({ cookie, type: Constants.typeRequest.GET_STORIES })
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
