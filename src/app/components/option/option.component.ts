import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from 'app/_service/account.service';
import { AccountModel } from 'model/account.model';


@Component({
  selector: "app-option",
  templateUrl: "./option.component.html",
  styleUrls: ["./option.component.scss"]
})
export class OptionComponent implements OnInit {
  @Input() public type: string;
  @Output() public resetResults = new EventEmitter()

  public optionValue:
    {
      getMediaOf: string,
      contextSearch: 'hashtag' | 'place' | 'user' | 'blended' | 'placeFacebook',
      isGetTopMedia: boolean,
      isGetTaggedMedia: boolean
    } = {
      getMediaOf: 'hashtag',
      contextSearch: 'hashtag' ,
      isGetTopMedia: false,
      isGetTaggedMedia: false
    }

  public selectedAccountIds: string[] = [];
  public accounts: AccountModel[] = [];
  constructor(private accountService: AccountService) { }
  public onResetResults(){
    this.resetResults.emit()
  }
  public get selectedAccounts(): AccountModel[] {
    return this.accounts.filter(account =>
      this.selectedAccountIds.includes(account._id)
    );
  }

  ngOnInit() {
    this.accountService.getAccounts().then(accounts => {
      if (!accounts) return;
      this.accounts = accounts;
      this.selectedAccountIds = this.accounts.map(account => account._id)
    });
  }
}
