import { Component, OnInit, Input } from "@angular/core";
import { Constants } from "src/app/utils/Constants";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.css"]
})
export class ResultComponent implements OnInit {
  @Input() public type: string;
  @Input() public results: object[];
  constructor() {}

  ngOnInit() {}
}
