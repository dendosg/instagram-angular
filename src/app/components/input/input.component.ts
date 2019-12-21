import { getOptionSelector, getInputSelector } from './../../reducers/layout.reducer';
import { Component, OnInit, Output, Input } from "@angular/core";
import {uniq} from 'lodash'
import { Constants, GET_MEDIA_TYPE, APP_ROUTES } from "app/utils/Constants";
import { AppService } from "app/_service/app.service";
import { Store, select } from "@ngrx/store";
import { AppState } from "app/reducers";
import { getCurrentRouteSelector } from "app/reducers/layout.reducer";
import { SetCurrentInputText } from 'app/actions/layout.action';
@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"]
})
export class InputComponent implements OnInit {
  public currentRoute: APP_ROUTES;
  public optionValue;
  public inputValue: string;
  constructor(private store: Store<AppState>) { 
    this.store.pipe(select(getCurrentRouteSelector)).subscribe(currentRoute => this.currentRoute = currentRoute)
    this.store.pipe(select(getOptionSelector)).subscribe(optionValue => this.optionValue = optionValue)
    this.store.pipe(select(getInputSelector)).subscribe(inputValue => this.inputValue = inputValue)
  }

  public handleInputValues(event){
    this.store.dispatch(
      new SetCurrentInputText(this.inputValue, this.currentRoute)
    );
  }

  public get placeholder() {
    switch (this.currentRoute) {
      case APP_ROUTES.GET_FOLLOWER:
      case APP_ROUTES.GET_FOLLOWING: return "Enter userId";
      case APP_ROUTES.GET_USER_INFO: return "Enter username or userId"
      case APP_ROUTES.SEARCH: return "Enter keyword"  
      case APP_ROUTES.GET_COMMENT:
      case APP_ROUTES.GET_LIKE:
      case APP_ROUTES.GET_MEDIA_INFO: return 'Enter shortcode';
      case APP_ROUTES.GET_HASHTAG_INFO: return 'Enter hashtag';
      case APP_ROUTES.GET_MEDIA:
        switch (this.optionValue.getMediaOf) {
          case GET_MEDIA_TYPE.USER: return 'Enter userid'
          case GET_MEDIA_TYPE.HASHTAG: return 'Enter hashtag name'
          case GET_MEDIA_TYPE.LOCATION: return 'Enter locationId'
          case GET_MEDIA_TYPE.FACEBOOK_FEED: return 'Enter pageId or userId'
          default: return ''
        }
      default: return '';
    }
  }

  ngOnInit() {
   }
}
