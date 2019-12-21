import { getOptionSelector } from './../../reducers/layout.reducer';
import { getCurrentRouteSelector } from 'app/reducers/layout.reducer';
import { ActivatedRoute } from "@angular/router";
import { CONTEXT_SEARCH, GET_MEDIA_TYPE, APP_ROUTES } from "./../../utils/Constants";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AccountModel } from "model/account.model";
import { Store, select } from "@ngrx/store";
import { AppState } from "app/reducers";
import { getAccountsSelector } from "app/reducers/account.reducer";

@Component({
  selector: "app-option",
  templateUrl: "./option.component.html",
  styleUrls: ["./option.component.scss"]
})
export class OptionComponent implements OnInit {
  public optionValue: {
    getMediaOf: GET_MEDIA_TYPE;
    contextSearch: CONTEXT_SEARCH;
    isGetTopMedia: boolean;
    isGetTaggedMedia: boolean;
    isProfile: boolean;
  };

  public selectedAccountIds: string[] = [];
  public accounts: AccountModel[];
  public currentRoute: APP_ROUTES;
  public APP_ROUTES = APP_ROUTES;
  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.store.pipe(select(getCurrentRouteSelector)).subscribe(currentRoute => this.currentRoute = currentRoute)
    this.store.pipe(select(getOptionSelector)).subscribe(optionValue => this.optionValue = optionValue)
  }
  public get selectedAccounts(): AccountModel[] {
    return this.accounts.filter(account =>
      this.selectedAccountIds.includes(account._id)
    );
  }

  ngOnInit() {
    this.store.pipe(select(getAccountsSelector)).subscribe(accounts => {
      this.accounts = accounts;
      this.selectedAccountIds = this.accounts.map(account => account._id);
    });

    // http://localhost:4200/media?query=huy,alo,dashdsadu&type=hashtag
    this.route.queryParams.subscribe(params => {
      const type: GET_MEDIA_TYPE = params.type;
      if (!type) return;
      this.optionValue.getMediaOf = type;
    });
  }
}
