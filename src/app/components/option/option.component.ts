import { ActivatedRoute } from '@angular/router';
import { CONTEXT_SEARCH, GET_MEDIA_TYPE } from './../../utils/Constants';
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
      getMediaOf: GET_MEDIA_TYPE,
      contextSearch: CONTEXT_SEARCH,
      isGetTopMedia: boolean,
      isGetTaggedMedia: boolean
      isProfile: boolean
    } = {
      getMediaOf: GET_MEDIA_TYPE.FACEBOOK_FEED,
      contextSearch: CONTEXT_SEARCH.PLACE_FACEBOOK ,
      isGetTopMedia: false,
      isGetTaggedMedia: false,
      isProfile: true
    }

  public selectedAccountIds: string[] = [];
  public accounts: AccountModel[] = [];
  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute

    ) { }
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

    // http://localhost:4200/media?query=huy,alo,dashdsadu&type=hashtag
    this.route.queryParams
    .subscribe(params => {
      const type: GET_MEDIA_TYPE = params.type
      if(!type) return
      this.optionValue.getMediaOf = type
    });
  }
}
