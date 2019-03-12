import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from 'src/app/_service/account.service';
import { AccountModel } from 'src/model/account.model';

@Component({
  selector: "app-option",
  templateUrl: "./option.component.html",
  styleUrls: ["./option.component.css"]
})
export class OptionComponent implements OnInit {
  @Input() public type: string;
  public selectedAccountIds: string[] = [];
  public accounts: AccountModel[] = [];
  
  constructor(private accountService: AccountService) { }

  public get selectedAccounts(): AccountModel[] {
    return this.accounts.filter(account =>
      this.selectedAccountIds.includes(account._id)
    );
  }

  ngOnInit() {
    this.accountService.getAccounts().then(accounts => {
      if (!accounts) return;
      this.accounts = accounts;
      console.log(this.accounts);
    });
  }
}
