import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  isShowAddAccountModal = false;
  isShowSelectAccountModal = false;

  selectedAccountIds = [];
  accounts = [{ name: "Huy", id: 19 }, { name: "Van", id: 20 }];
  cookies: string;
  constructor() {}

  ngOnInit() {}
  showAddAccountModal() {
    this.isShowAddAccountModal = true;
  }
  addAccount() {
    console.log(this.cookies);
    this.isShowAddAccountModal = false;
  }
  handleCancel() {
    this.isShowAddAccountModal = false;
    this.isShowSelectAccountModal = false;
  }

  // SELECT ACCOUNT
  showSelectAccountModal() {
    this.isShowSelectAccountModal = true;
  }
  selectAccount() {
    this.isShowSelectAccountModal = false;
  }
}
