import { Component, OnInit, Output, Input } from "@angular/core";
import { Constants } from "src/app/utils/Constants";
import lodash from 'lodash'
@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"]
})
export class InputComponent implements OnInit {
  @Input() public type: string;
  @Input() public optionValue;
  public inputValue: string;

  constructor() { }

  public get inputValues(): string[] {
    if (!this.inputValue) return [];
    return lodash.uniq(this.inputValue.split("\n").filter(item => item));
  }

  public get placeholder() {
    switch (this.type) {
      case Constants.typeComponent.GET_FOLLOWER_COMPONENT:
      case Constants.typeComponent.GET_FOLLOWING_COMPONENT: return "Enter userId";
      case Constants.typeComponent.GET_USER_INFO_COMPONENT: return "Enter username"
      case Constants.typeComponent.SEARCH_COMPONENT: return "Enter keyword"  
      case Constants.typeComponent.GET_COMMENT_COMPONENT:
      case Constants.typeComponent.GET_LIKE_COMPONENT:
      case Constants.typeComponent.GET_MEDIA_INFO_COMPONENT: return 'Enter shortcode';
      case Constants.typeComponent.GET_MEDIA_COMPONENT:
        switch (this.optionValue.getMediaOf) {
          case 'user': return 'Enter userid'
          case 'hashtag': return 'Enter hashtag name'
          case 'location': return 'Enter locationId'
          default: return ''
        }
      default: return '';
    }
  }

  ngOnInit() { }
}
