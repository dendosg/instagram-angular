import { Component, OnInit, Input } from "@angular/core";
import { InstagramService } from "../_service/instagram.service";

@Component({
  selector: "app-get-comment",
  templateUrl: "./get-comment.component.html",
  styleUrls: ["./get-comment.component.css"]
})
export class GetCommentComponent implements OnInit {
  constructor(
    private instagramService: InstagramService
  ) {
  }

  ngOnInit() {
  }
}
