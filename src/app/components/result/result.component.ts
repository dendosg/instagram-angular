import { Component, OnInit, Input } from "@angular/core";
import { Constants } from "src/app/utils/Constants";
import * as moment from "moment";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.css"]
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
  public scrollTop(){
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
