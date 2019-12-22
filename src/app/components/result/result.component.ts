import {
  getCurrentRouteSelector,
  getOptionSelector
} from "./../../reducers/layout.reducer";
import { Component, OnInit, Input } from "@angular/core";
import {
  Constants,
  GET_MEDIA_TYPE,
  APP_ROUTES,
  CONTEXT_SEARCH
} from "app/utils/Constants";
import * as moment from "moment";
import { Router } from "@angular/router";
import { AppService } from "app/_service/app.service";
import { get } from "lodash";
import { Store, select } from "@ngrx/store";
import { AppState } from "app/reducers";
import { getResultsSelector } from "app/reducers/instagram.reducer";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.scss"]
})
export class ResultComponent implements OnInit {
  @Input() public type: string;
  public results: object[] = [];
  public optionValue: any;
  public currentRoute: APP_ROUTES;
  public APP_ROUTES = APP_ROUTES;
  public CONTEXT_SEARCH = CONTEXT_SEARCH;
  public isDescending: boolean = true;
  public visible: { [key: string]: boolean } = {};
  constructor(
    private router: Router,
    private appService: AppService,
    private store: Store<AppState>
  ) {
    this.store
      .pipe(select(getCurrentRouteSelector))
      .subscribe(currentRoute => (this.currentRoute = currentRoute));
    this.store
      .pipe(select(getOptionSelector))
      .subscribe(optionValue => (this.optionValue = optionValue));

    this.store.pipe(select(getResultsSelector)).subscribe(results => {
      if (!results || !results.length) return;
      this.results = results;
    });
  }
  public get tableHeaders(): string[] {
    let tableHeaders: string[] = [];
    switch (this.currentRoute) {
      case this.APP_ROUTES.SEARCH:
        const { contextSearch } = this.optionValue;
        if (contextSearch === this.CONTEXT_SEARCH.USER)
          return ["id", "username", "full_name", "is verified"];
        if (contextSearch === this.CONTEXT_SEARCH.HASHTAG)
          return ["id", "hashtag", "media_count", "search_result_subtitle"];
        if (contextSearch === this.CONTEXT_SEARCH.PLACE)
          return [
            "id",
            "name",
            "slug",
            "lng",
            "lat",
            "facebook_places_id",
            "address",
            "city",
            "external_source",
            "short_name"
          ];

      case this.APP_ROUTES.GET_LIKE:
        return ["id", "username", "full name", "is verified"];
      case this.APP_ROUTES.GET_COMMENT:
        return ["id", "username", "user_id", "text", "commented at"];
      case this.APP_ROUTES.GET_FOLLOWER:
      case this.APP_ROUTES.GET_FOLLOWING:
        return ["id", "username", "full_name", "is_verified"];
      default:
        break;
    }
    return tableHeaders;
  }
  public getFormatDate(timestamp) {
    return moment(timestamp * 1000).fromNow();
  }

  openImageInNewTab(imageUrl: string) {
    window.open(imageUrl, "_blank");
  }

  public getHashtagFromMessage(message: string) {
    if (!message) return [];
    const hashtags =
      message.match(/(?:\s|^)#[A-Za-z0-9\-\.\_]+(?:\s|$)/g) || [];
    return hashtags.map(hashtag => hashtag.replace("#", "").replace(/\s/g, ""));
  }

  public copyItems(arrItems) {
    const message = arrItems.join("\n");
    console.log(message);
    message.select();
    document.execCommand("copy");
    for (const item of arrItems) {
      this.visible[item] = false;
    }
  }

  public getUserFromMessage(message: string) {
    if (!message) return [];
    const users = message.match(/(?:\s|^)@[A-Za-z0-9\-\.\_]+(?:\s|$)/g) || [];
    return users.map(user => user.replace("@", "").replace(/\s/g, ""));
  }
  public onPageIndexChange(page: number) {
    this.appService.setCurrentIndexPage(page);
    this.scrollTop();
  }
  public scrollTop() {
    window.scroll(0, 0);
  }
  public sort(field: string, type?: string, anotherField?: string) {
    const sortedResults = this.results.sort((a, b) => {
      if (type && type === "hashtagInCaption") {
        const message_a = get(a, "edge_media_to_caption.edges[0].node.text");
        const message_b = get(b, "edge_media_to_caption.edges[0].node.text");
        const hashtags_a = this.getHashtagFromMessage(message_a);
        const hashtags_b = this.getHashtagFromMessage(message_b);
        return this.isDescending
          ? hashtags_b.length - hashtags_a.length
          : hashtags_a.length - hashtags_b.length;
      }
      if (type && type === "userInCaption") {
        const message_a = get(a, "edge_media_to_caption.edges[0].node.text");
        const message_b = get(b, "edge_media_to_caption.edges[0].node.text");
        const users_a = this.getUserFromMessage(message_a);
        const users_b = this.getUserFromMessage(message_b);
        return this.isDescending
          ? users_b.length - users_a.length
          : users_a.length - users_b.length;
      }
      const res_a = get(a, field) || get(a, anotherField) || 0;
      const res_b = get(b, field) || get(b, anotherField) || 0;
      return this.isDescending
        ? Number(res_b) - Number(res_a)
        : Number(res_a) - Number(res_b);
    });

    this.isDescending = !this.isDescending;
    const results = [...sortedResults];
    this.appService.setResults(results);
  }
  public goToGetMedia(keyword: string) {
    this.router.navigate(["/media"], {
      queryParams: { query: keyword, type: GET_MEDIA_TYPE.LOCATION }
    });
  }
  ngOnInit() {}
}
