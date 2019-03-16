// Native
const fs = require("fs");

// Packages
const request = require("request-promise-native");
const { Cookie } = require("tough-cookie");
const isUrl = require("is-url");
const useragentFromSeed = require("useragent-from-seed");
const requestNode = require("request");
const baseUrl = "https://www.instagram.com";

class Instagram {
  constructor({ cookie }, { language, proxy } = {}) {
    this.credentials = {
      cookie
    };
    const user_id =
      (cookie.match(/user_id=\d+/gm) &&
        cookie.match(/user_id=\d+/gm)[0].slice(8)) ||
      0;

    const userAgent = useragentFromSeed(user_id);
    this.request = request.defaults({
      baseUrl,
      headers: {
        "User-Agent": userAgent,
        "Accept-Language": language || "en-US",
        "X-Instagram-AJAX": 1,
        "X-Requested-With": "XMLHttpRequest",
        Referer: baseUrl,
        Cookie: JSON.stringify(cookie)
      },
      proxy,
      json: true
    });
  }

  logout() {
    return this.request("/accounts/logout/ajax/");
  }
  getHome() {
    return this.request("/?__a=1").then(data => data.graphql.user);
  }
  getUserById({ userId }) {
    let options = {
      url: "https://www.instagram.com/web/friendships/" + userId + "/follow/",
      headers: {
        Cookie: this.credentials.cookie
      }
    };
    return request(options)
      .then(body => {
        let data = body.match(/sharedData(.*?);<\/script>/i);
        if (!data) {
          console.log("getUserById Khong co data");
          return { statusCode: 400, data };
        }
        data = data[0].replace(";</script>", "").replace("sharedData = ", "");
        data = JSON.parse(data);
        if (data.entry_data.Challenge) {
          console.log(
            this.credentials.cookie.slice(-15),
            "Checkpoint cmnr",
            data.entry_data.Challenge[0].challengeType
          );
          return { statusCode: 404, data };
        }
        data = data.entry_data.ProfilePage[0].graphql.user;
        return {
          statusCode: 200,
          data
        };
      })
      .catch(e => {
        if (!e) {
          console.log("Ko co e");
          return { statusCode: 404, data: null };
        }
        if (!e.statusCode) {
          console.log(userId, e.message);
          return { statusCode: 404, data: null };
        }
        if (e.statusCode == 400) {
          console.log("id sai", e.name);
        }
        if (e.statusCode == 404) {
          console.log("id sai, page notfound", e.name);
        }
        console.log(userId, "getUserById Loi cmnr" + e.message);
        return {
          statusCode: e.statusCode,
          data: e.name
        };
      });
  }
  getUserByUsername({ username }) {
    return this.request(`/${username}/?__a=1`)
      .then(res => ({
        statusCode: 200,
        data: res.graphql.user
      }))
      .catch(e => {
        console.log("getUserByUsername loi cmnr", e.name);
        return {
          statusCode: e.statusCode,
          data: e.name
        };
      });
  }

  _getData({ fieldName, type, queryHash, variables }) {
    return this.request("/graphql/query/", {
      qs: {
        query_hash: queryHash,
        variables: JSON.stringify(variables)
      }
    })
      .then(data => {
        if (typeof data != "object") {
          throw new Error("data is not an object");
        }
        return data.data[type][fieldName];
      })
      .then(({ count, page_info, edges }) => ({
        statusCode: 200,
        data: {
          count,
          page_info,
          data: edges.map(edge => edge.node)
        }
      }))
      .catch(e => {
        console.log(
          "InstagramApi _getData loi cmnr:",
          e.message,
          "Cookie",
          this.credentials.cookie.slice(-15)
        );
        return { statusCode: e.statusCode, data: [] };
      });
  }
  getComment({ shortcode, first = 30, after }) {
    return this._getData({
      fieldName: "edge_media_to_comment",
      type: "shortcode_media",
      queryHash: "33ba35852cb50da46f5b5e889df7d159",
      variables: { shortcode, first, after }
    });
  }
  getLiker({ shortcode, first = 50, after }) {
    return this._getData({
      fieldName: "edge_liked_by",
      type: "shortcode_media",
      queryHash: "1cb6ec562846122743b61e492c85999f",
      variables: { shortcode, first, after }
    });
  }
  getStories() {
    const query_hash = "802af4ef297b39666fd5817cb99f1092";
    const variables = { only_stories: true };
    return this.request("/graphql/query/", { qs: { query_hash, variables } })
      .then(res =>
        res.data.user.feed_reels_tray.edge_reels_tray_to_reel.edges.map(
          story => story.node
        )
      )
      .then(stories => ({ statusCode: 200, data: stories }))
      .catch(e => ({ statusCode: 400, data: [] }));
  }

  getStoriesByIds({ reel_ids }) {
    const query_hash = "de8017ee0a7c9c45ec4260733d81ea31";
    const variables = {
      reel_ids,
      tag_names: [],
      location_ids: [],
      highlight_reel_ids: [],
      precomposed_overlay: false,
      show_story_viewer_list: true,
      story_viewer_fetch_count: 50,
      story_viewer_cursor: ''
    };
    return this.request(`graphql/query?query_hash=${query_hash}&variables=${JSON.stringify(variables)}`)
      .then(res => res.data.reels_media)
      .then(stories => ({ statusCode: 200, data: stories }))
      .catch(e => ({ statusCode: 400, data: [] }))
  }

  get_media_by_location({ locationId, first = 8, after }) {
    return this._getData({
      fieldName: "edge_location_to_media",
      type: "location",
      queryHash: "ac38b90f0f3981c42092016a37c59bf7",
      variables: { id: locationId, first, after }
    });
  }
  get_media_by_location_top_posts({ locationId, first = 4, after }) {
    return this._getData({
      fieldName: "edge_location_to_top_posts",
      type: "location",
      queryHash: "ac38b90f0f3981c42092016a37c59bf7",
      variables: { id: locationId, first, after }
    });
  }
  get_media_by_hashtag({ tag_name, first = 5, after }) {
    return this._getData({
      fieldName: "edge_hashtag_to_media",
      type: "hashtag",
      queryHash: "ded47faa9a1aaded10161a2ff32abb6b",
      variables: { tag_name: tag_name, first, after }
    });
  }
  get_media_by_hashtag_top_posts({ tag_name, first = 10, after }) {
    return this._getData({
      fieldName: "edge_hashtag_to_top_posts",
      type: "hashtag",
      queryHash: "ded47faa9a1aaded10161a2ff32abb6b",
      variables: { tag_name: tag_name, first, after }
    });
  }
  get_media_by_user({ userId, first = 50, after }) {
    return this._getData({
      fieldName: "edge_owner_to_timeline_media",
      type: "user",
      queryHash: "c6809c9c025875ac6f02619eae97a80e",
      variables: { id: userId, first, after }
    });
  }
  get_media_tagged_by_user({ userId, first = 50, after }) {
    return this._getData({
      fieldName: "edge_user_to_photos_of_you",
      type: "user",
      queryHash: "e31a871f7301132ceaab56507a66bbb7",
      variables: { id: userId, first, after }
    });
  }
  getFollowers({ userId, first = 50, after }) {
    return this._getData({
      fieldName: "edge_followed_by",
      type: "user",
      queryHash: "37479f2b8209594dde7facb0d904896a",
      variables: {
        id: userId,
        first,
        after
      }
    });
  }

  getFollowings({ userId, first = 50, after }) {
    return this._getData({
      fieldName: "edge_follow",
      type: "user",
      queryHash: "58712303d941c6855d4e888c5f0cd22f",
      variables: {
        id: userId,
        first,
        after
      }
    });
  }

  getActivity() {
    return this.request("/accounts/activity/?__a=1").then(
      data => data.graphql.user
    );
  }

  getProfile() {
    return this.request("/accounts/edit/?__a=1")
      .then(data => ({ statusCode: 200, data: data.form_data }))
      .catch(err => ({ statusCode: 400, data: err }));
  }

  updateProfile({
    name = "",
    email = "",
    username,
    phoneNumber = "",
    gender,
    biography = "",
    website = "",
    similarAccountSuggestions = true
  }) {
    return this.request.post("/accounts/edit/", {
      form: {
        first_name: name,
        email,
        username: this.credentials.username || username,
        phone_number: phoneNumber,
        gender,
        biography,
        external_url: website,
        chaining_enabled: similarAccountSuggestions
      }
    });
  }

  changeProfilePhoto({ photo }) {
    return this.request.post("/accounts/web_change_profile_picture/", {
      formData: {
        profile_pic: isUrl(photo) ? request(photo) : fs.createReadStream(photo)
      }
    });
  }

  deleteMedia({ mediaId }) {
    return this.request.post(`/create/${mediaId}/delete/`);
  }

  _uploadPhoto({ photo }) {
    return this.request
      .post("/create/upload/photo/", {
        formData: {
          upload_id: Date.now().toString(),
          photo: isUrl(photo) ? request(photo) : fs.createReadStream(photo),
          media_type: "1"
        }
      })
      .catch(e => console.log("_uploadPhoto loi cmnr" + e.name));
  }

  uploadPhoto({ photo, caption = "" }) {
    return this._uploadPhoto({ photo })
      .then(({ upload_id }) =>
        this.request.post("/create/configure/", {
          form: { upload_id, caption }
        })
      )
      .catch(e => console.log("uploadPhoto loi cmnr" + e.name));
  }

  uploadStory({ photo, caption = "" }) {
    return this._uploadPhoto({ photo }).then(({ upload_id }) =>
      this.request.post("/create/configure_to_story/", {
        form: { upload_id, caption }
      })
    );
  }

  getMediaFeedByLocation({ locationId }) {
    return this.request(`/explore/locations/${locationId}/?__a=1`).then(
      res => ({ statusCode: 200, data: res.graphql.location })
    );
  }

  getMediaFeedByHashtag({ hashtag }) {
    return this.request(`/explore/tags/${hashtag}/?__a=1`).then(res => ({
      statusCode: 200,
      data: res.graphql.hashtag
    }));
  }

  locationSearch({ query, latitude, longitude }) {
    return this.request("/location_search/", {
      qs: { search_query: query, latitude, longitude }
    }).then(res => ({ statusCode: 200, data: res.venues }));
  }

  getMediaByShortcode({ shortcode }) {
    return this.request(`/p/${shortcode}/?__a=1`)
      .then(res => {
        console.log("res", res);
        return { statusCode: 200, data: res.graphql.shortcode_media };
      })
      .catch(e => ({ statusCode: e.statusCode, data: null }));
  }

  addComment({ mediaId, text }) {
    return this.request.post(`/web/comments/${mediaId}/add/`, {
      form: { comment_text: text, replied_to_comment_id: null }
    });
  }

  deleteComment({ mediaId, commentId }) {
    return this.request.post(`/web/comments/${mediaId}/delete/${commentId}/`);
  }

  getChallenge({ challengeUrl }) {
    return this.request(`${challengeUrl}?__a=1`);
  }

  _navigateChallenge({ challengeUrl, endpoint, form }) {
    const url = endpoint
      ? challengeUrl.replace("/challenge/", `/challenge/${endpoint}/`)
      : challengeUrl;
    return this.request.post(url, {
      headers: {
        Referer: `${baseUrl}${challengeUrl}`
      },
      form
    });
  }

  updateChallenge({ challengeUrl, choice, securityCode }) {
    const form = securityCode ? { security_code: securityCode } : { choice };
    return this._navigateChallenge({
      challengeUrl,
      form
    });
  }

  resetChallenge({ challengeUrl }) {
    return this._navigateChallenge({
      challengeUrl,
      endpoint: "reset"
    });
  }

  replayChallenge({ challengeUrl }) {
    return this._navigateChallenge({
      challengeUrl,
      endpoint: "replay"
    });
  }

  approve({ userId }) {
    return this.request.post(`/web/friendships/${userId}/approve/`);
  }

  ignore({ userId }) {
    return this.request.post(`/web/friendships/${userId}/ignore/`);
  }

  follow({ userId }) {
    return this.request.post(`/web/friendships/${userId}/follow/`);
  }

  unfollow({ userId }) {
    return this.request.post(`/web/friendships/${userId}/unfollow/`);
  }

  block({ userId }) {
    return this.request.post(`/web/friendships/${userId}/block/`);
  }

  unblock({ userId }) {
    return this.request.post(`/web/friendships/${userId}/unblock/`);
  }

  like({ mediaId }) {
    return this.request.post(`/web/likes/${mediaId}/like/`);
  }

  unlike({ mediaId }) {
    return this.request.post(`/web/likes/${mediaId}/unlike/`);
  }

  save({ mediaId }) {
    return this.request.post(`/web/save/${mediaId}/save/`);
  }

  unsave({ mediaId }) {
    return this.request.post(`/web/save/${mediaId}/unsave/`);
  }

  search({ query, context = "blended" }) {
    return this.request("/web/search/topsearch/", {
      qs: { query, context, include_reel: true }
    });
  }
}

module.exports = Instagram;
