// Native
const fs = require("fs");

// Packages
const request = require("request-promise-native");
const { Cookie } = require("tough-cookie");
const isUrl = require("is-url");
const useragentFromSeed = require("useragent-from-seed");
const requestNode = require("request");
const baseUrl = "https://graph.facebook.com/v2.10/";

class Facebook {
  constructor({ access_token }) {
    this.credentials = {
      access_token
    };

    this.request = request.defaults({
      baseUrl,
      qs: { access_token },
      json: true
    });
  }
  searchPlace({ keyword, limit = 50, after = "" }) {
    const fields = "fan_count,name,checkins";
    return this.request("search", {
      qs: {
        type: "place",
        q: keyword,
        fields,
        limit,
        after
      }
    })
      .then(data => ({ statusCode: 200, data }))
      .catch(e => ({ statusCode: 400, data: [] }));
  }
}

module.exports = Facebook;