import { Component, OnInit } from "@angular/core";
import { AccountService } from "app/_service/account.service";
import { Store } from "@ngrx/store";
import { AppState } from "app/reducers";
import { AddAccount } from "app/actions/account.action";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  isShowAddAccountModal = false;
  cookies: string;
  constructor(private accountService: AccountService, private store: Store<AppState>) {}
  ngOnInit() {}
  showAddAccountModal() {
    this.isShowAddAccountModal = true;
  }
  async addAccount() {
    const cookie = this.cookies;
    if (!this.accountService.verifyCookie({ cookie }))
      return alert("Check cookie again");
    const user = await this.accountService.getUserByCookie({ cookie });
    if (!user) return;
    this.store.dispatch(new AddAccount(cookie, user));
    this.isShowAddAccountModal = false;
  }
  handleCancel() {
    this.isShowAddAccountModal = false;
  }
  
}
