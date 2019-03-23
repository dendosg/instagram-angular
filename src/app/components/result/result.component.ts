import { Component, OnInit, Input } from "@angular/core";
import { Constants } from "src/app/utils/Constants";
import * as moment from "moment";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.scss"]
})
export class ResultComponent implements OnInit {
  @Input() public type: string;
  @Input() public results: object[];
  @Input() public optionValue: any;

  public isDescending: boolean = true;
  constructor() { }

  public getFormatDate(timestamp) {
    return moment(timestamp * 1000).fromNow();
  }

  openImageInNewTab(imageUrl: string) {
    window.open(imageUrl, '_blank')
  }

  public getHashtagFromMessage(message: string) {
    if (!message) return []
    const hashtags = message.match(/(?:\s|^)#[A-Za-z0-9\-\.\_]+(?:\s|$)/g) || []
    return hashtags.map(hashtag => hashtag.replace('#', '').replace(/\s/g, ""))
  }

  public getUserFromMessage(message: string) {
    if (!message) return []
    const users = message.match(/(?:\s|^)@[A-Za-z0-9\-\.\_]+(?:\s|$)/g) || []
    return users.map(user => user.replace('@', '').replace(/\s/g, ""))
  }

  public scrollTop() {
    window.scroll(0, 0)
  }
  public sort(type: string) {
    const sortedResults = this.results.sort((a, b) => {
      if (type === "taken_at_timestamp" || type === "created_at" || type === 'is_verified' || type === 'follower_count' || type === 'media_count')
        return this.isDescending ? b[type] - a[type] : a[type] - b[type];

      if (type === "comment")
        return this.isDescending
          ? b["edge_media_to_comment"].count -
          a["edge_media_to_comment"].count
          : a["edge_media_to_comment"].count -
          b["edge_media_to_comment"].count;

      if (type === "like")
        return this.isDescending
          ? b["edge_media_preview_like"].count -
          a["edge_media_preview_like"].count
          : a["edge_media_preview_like"].count -
          b["edge_media_preview_like"].count;
    });

    this.isDescending = !this.isDescending;
    this.results = [...sortedResults]
  }
  ngOnInit() { }
}
