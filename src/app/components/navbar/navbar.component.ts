import { Component, OnInit } from "@angular/core";
import { AccountModel } from "model/account.model";
import { AccountService } from "app/_service/account.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  isShowAddAccountModal = false;
  accounts: AccountModel[];
  cookies: string;
  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accountService.getAccounts().then(accounts => {
      if (!accounts) return;
      this.accounts = accounts;
      console.log(this.accounts)
    });
  }
  showAddAccountModal() {
    this.isShowAddAccountModal = true;
  }
  async addAccount() {
    const cookie = this.cookies;
    if (!this.accountService.verifyCookie({ cookie }))
      return alert("Check cookie again");
    const user = await this.accountService.getUserByCookie({ cookie });
    if(!user) return
    const addedUser = await this.accountService.addAccount({ cookie, user });
    this.isShowAddAccountModal = false;
  }
  handleCancel() {
    this.isShowAddAccountModal = false;
  }

}
