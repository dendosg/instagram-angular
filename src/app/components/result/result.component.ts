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
  public isDescending: boolean = true;
  constructor() {}

  public getFormatDate(timestamp) {
    return moment(timestamp * 1000).fromNow();
  }
  public get isViderere(){
    return this.results.filter(item => item['is_video'])[0]
  }
  public sort(type: string) {
    if (type === "comment") {
      this.results = this.results.sort((a, b) =>
        this.isDescending
          ? b["edge_media_to_comment"].count - a["edge_media_to_comment"].count
          : a["edge_media_to_comment"].count - b["edge_media_to_comment"].count
      );
      this.isDescending = !this.isDescending;
      console.log(this.results);
    }
  }
  ngOnInit() {}
}
