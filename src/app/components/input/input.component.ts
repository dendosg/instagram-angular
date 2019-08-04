import { Component, OnInit, Output, Input } from "@angular/core";
import {uniq} from 'lodash'
import { Constants, GET_MEDIA_TYPE } from "app/utils/Constants";
import { AppService } from "app/_service/app.service";
@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"]
})
export class InputComponent implements OnInit {
  @Input() public type: string;
  @Input() public optionValue;
  public inputValue: string;

  constructor(private appService: AppService) { 
    this.appService.inputValuesSubject.subscribe(inputValues => this.inputValue = inputValues.join('\n'))
  }

  public handleInputValues(){
    if (!this.inputValue) return this.appService.setInputValues([])
    const keywords: string[] = uniq(this.inputValue.split("\n").filter(item => item));
    this.appService.setInputValues(keywords)
  }

  public get placeholder() {
    switch (this.type) {
      case Constants.typeComponent.GET_FOLLOWER_COMPONENT:
      case Constants.typeComponent.GET_FOLLOWING_COMPONENT: return "Enter userId";
      case Constants.typeComponent.GET_USER_INFO_COMPONENT: return "Enter username or userId"
      case Constants.typeComponent.SEARCH_COMPONENT: return "Enter keyword"  
      case Constants.typeComponent.GET_COMMENT_COMPONENT:
      case Constants.typeComponent.GET_LIKE_COMPONENT:
      case Constants.typeComponent.GET_MEDIA_INFO_COMPONENT: return 'Enter shortcode';
      case Constants.typeComponent.GET_HASHTAG_INFO_COMPONENT: return 'Enter hashtag';
      case Constants.typeComponent.GET_MEDIA_COMPONENT:
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
