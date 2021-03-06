import { Injectable } from "@angular/core";
import Axios from "axios";
import { Constants } from "../utils/Constants";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class InstagramService {
  constructor(private httpClient: HttpClient) { }
  public getMyProfile({ cookie }) {
    return this.commonRequest({
      cookie,
      type: Constants.typeRequest.GET_MY_PROFILE
    });
  }

  public getComment({ cookie, shortcode, after }) {
    return this.commonRequest({
      cookie,
      input: shortcode,
      type: Constants.typeRequest.GET_COMMENT,
      after
    });
  }

  public getFollower({ cookie, userId, after }) {
    return this.commonRequest({
      cookie,
      input: userId,
      type: Constants.typeRequest.GET_FOLLOWER,
      after
    });
  }

  public getFollowing({ cookie, userId, after }) {
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

  public getMediaInfo({ cookie, shortcode }) {
    return this.commonRequest({
      cookie,
      input: shortcode,
      type: Constants.typeRequest.GET_MEDIA
    });
  }

  public getLikerOfMedia({ cookie, shortcode, after }) {
    return this.commonRequest({
      cookie,
      input: shortcode,
      type: Constants.typeRequest.GET_LIKE,
      after
    });
  }

  public getMediaOfUser({ cookie, userId, after }) {
    return this.commonRequest({
      cookie,
      input: userId,
      type: Constants.typeRequest.GET_MEDIA_OF_USER,
      after
    });
  }

  public getMediaTaggedOfUser({ cookie, userId, after }) {
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

  public getMediaOfHashtag({ cookie, tag_name, after }) {
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

  public getMediaOfLocation({ cookie, locationId, after }) {
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

  public search(
    { cookie, query, context }:
      { cookie: string, query: string, context: 'hashtag' | 'place' | 'user' | 'blended' | 'placeFacebook' }
  ) {
    return this.httpClient.post(Constants.baseApiUrl, {
      type: Constants.typeRequest.SEARCH,
      input: query,
      context,
      cookie
    });

  }

  public async getMyStories({ cookie }) {
    // const listStoriesData = (await this.commonRequest({
    //   cookie,
    //   type: Constants.typeRequest.GET_STORIES
    // })).toPromise();
    // const { statusCode, data } = listStoriesData
    // const storyIds = data.map(story => story.id);
    // return this.commonRequest({
    //   cookie,
    //   input: storyIds,
    //   type: "GET_STORIES_BY_IDS"
    // });
  }

  public commonRequest({ cookie, input = null, type, after = null }) {
    return this.httpClient.post(Constants.baseApiUrl,{
      type,
      input,
      after,
      cookie
    })
  }
}
