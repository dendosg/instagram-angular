import { environment } from "environments/environment";

export const Constants = {
  baseApiUrl: environment.baseApiUrl,
  typeRequest: {
    GET_MY_PROFILE: "GET_MY_PROFILE",
    GET_COMMENT: "GET_COMMENT",
    GET_FOLLOWER: "GET_FOLLOWER",
    GET_FOLLOWING: "GET_FOLLOWING",
    GET_USER_BY_USERNAME: "GET_USER_BY_USERNAME",
    GET_USER_BY_ID: "GET_USER_BY_ID",
    GET_MEDIA: "GET_MEDIA",
    GET_LIKE: "GET_LIKE",
    GET_MEDIA_OF_USER: "GET_MEDIA_OF_USER",
    GET_MEDIA_TAGGED_OF_USER: "GET_MEDIA_TAGGED_OF_USER",
    GET_HASHTAG_INFO: "GET_HASHTAG_INFO",
    GET_MEDIA_OF_HASHTAG: "GET_MEDIA_OF_HASHTAG",
    GET_TOP_MEDIA_OF_HASHTAG: "GET_TOP_MEDIA_OF_HASHTAG",
    GET_LOCATION_INFO: "GET_LOCATION_INFO",
    GET_MEDIA_OF_LOCATION: "GET_MEDIA_OF_LOCATION",
    GET_TOP_MEDIA_OF_LOCATION: "GET_TOP_MEDIA_OF_LOCATION",
    LOCATION_SEARCH: "LOCATION_SEARCH",
    SEARCH: "SEARCH",
    GET_STORIES: "GET_STORIES"
  },
  typeComponent: {
    GET_COMMENT_COMPONENT: "GET_COMMENT_COMPONENT",
    GET_FOLLOWER_COMPONENT: "GET_FOLLOWER_COMPONENT",
    GET_FOLLOWING_COMPONENT: "GET_FOLLOWING_COMPONENT",
    GET_LIKE_COMPONENT: "GET_LIKE_COMPONENT",
    GET_MEDIA_COMPONENT: "GET_MEDIA_COMPONENT",
    GET_MEDIA_INFO_COMPONENT: "GET_MEDIA_INFO_COMPONENT",
    GET_USER_INFO_COMPONENT: "GET_USER_INFO_COMPONENT",
    GET_HASHTAG_INFO_COMPONENT: "GET_HASHTAG_INFO_COMPONENT",
    GET_MY_STORIES: "GET_MY_STORIES",
    SEARCH_COMPONENT: "SEARCH_COMPONENT"
  }
};

export enum CONTEXT_SEARCH {
  HASHTAG = "hashtag",
  PLACE = "place",
  USER = "user",
  BLENDED = "blended",
  PLACE_FACEBOOK = "placeFacebook"
}

export enum GET_MEDIA_TYPE {
  USER = "user",
  HASHTAG = "hashtag",
  LOCATION = "location",
}