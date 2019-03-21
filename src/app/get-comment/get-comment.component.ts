import { Component, OnInit, Input } from "@angular/core";
import { InstagramService } from "../_service/instagram.service";
import { Constants } from "../utils/Constants";

@Component({
  selector: "app-get-comment",
  templateUrl: "./get-comment.component.html",
  styleUrls: ["./get-comment.component.scss"]
})
export class GetCommentComponent implements OnInit {
  public type = Constants.typeComponent.GET_COMMENT_COMPONENT
  constructor(
    private instagramService: InstagramService
  ) {
  }

  ngOnInit() {
  }
}
