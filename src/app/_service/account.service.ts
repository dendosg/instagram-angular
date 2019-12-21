import { Injectable } from "@angular/core";
import axios from "axios";
import { Constants } from "app/utils/Constants";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class AccountService {
  public instagram;
  public baseUrlAccount = Constants.baseApiUrl + "account";
  constructor(private httpClient: HttpClient) {}

  verifyCookie({ cookie }) {
    const user_id =
      cookie.match(/user_id=\d+/gm) &&
      cookie.match(/user_id=\d+/gm)[0].slice(8);
    return !!user_id;
  }

  getUserByCookie({ cookie }) {
    if (!cookie) return;
    const user_id =
      cookie.match(/user_id=\d+/gm) &&
      cookie.match(/user_id=\d+/gm)[0].slice(8);
    if (!user_id) return;
    const data = { type: "GET_USER_BY_ID", cookie, input: user_id };
    return axios({
      method: "post",
      url: Constants.baseApiUrl,
      data
    }).then(res => res.data);
  }

  addAccount({ cookie, user }) {
    return this.httpClient.post(this.baseUrlAccount, {
      cookie,
      user
    });
  }
  getAccounts() {
    return this.httpClient.get(this.baseUrlAccount);
  }
}
