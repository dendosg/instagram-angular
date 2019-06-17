import { Injectable } from "@angular/core";
import axios from "axios";
@Injectable({
  providedIn: "root"
})
export class AccountService {
  public instagram;
  public baseUrlAccount = "http://localhost:8080/api/account";
  constructor() {}

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
      url: "http://localhost:8080/api",
      data
    }).then(res => {
      const { statusCode, data } = res.data;
      if (statusCode !== 200 || !data) return;
      return data;
    });
  }

  addAccount({ cookie, user }) {
    return axios({
      method: "post",
      url: this.baseUrlAccount,
      data: { cookie, user }
    })
      .then(res => {
        const { statusCode, msg } = res.data;
        if (statusCode !== 200 || !msg) return;
        return msg;
      })
      .catch(err => null);
  }
  getAccounts() {
    return axios
      .get(this.baseUrlAccount)
      .then(res => {
        if (res.data.statusCode !== 200) return null;
        return res.data.msg;
      })
      .catch(() => null);
  }
}
