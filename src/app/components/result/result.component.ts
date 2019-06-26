import { Component, OnInit, Input } from "@angular/core";
import { Constants } from "app/utils/Constants";
import * as moment from "moment";
import { Router } from "@angular/router";
import { AppService } from "app/_service/app.service";
import { get } from 'lodash';

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.scss"]
})
export class ResultComponent implements OnInit {
  @Input() public type: string;
  public results: object[] = [];
  @Input() public optionValue: any;

  public isDescending: boolean = true;
  public visible: { [key: string]: boolean } = {};
  constructor(
    private router: Router,
    private appService: AppService
  ) { 
    this.appService.resultsSubject.subscribe(results => this.results = results)
  }

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
  public getMediaOf(hashtags: string[]){
    this.appService.setInputValues(hashtags)
    // set option to hashtag
    this.scrollTop()
  }
  public copyItems(arrItems) {
    const message = arrItems.join('\n')
    console.log(message)
    message.select()
    document.execCommand("copy");
    for (const item of arrItems) {
      this.visible[item] = false
    }
  }

  public getUserFromMessage(message: string) {
    if (!message) return []
    const users = message.match(/(?:\s|^)@[A-Za-z0-9\-\.\_]+(?:\s|$)/g) || []
    return users.map(user => user.replace('@', '').replace(/\s/g, ""))
  }

  public scrollTop() {
    window.scroll(0, 0)
  }
  public sort(field: string, type?: string){
    const sortedResults = this.results.sort((a, b) => {
      if(type && type === 'hashtagInCaption') {
        const message_a = get(a,'edge_media_to_caption.edges[0].node.text')
        const message_b = get(b,'edge_media_to_caption.edges[0].node.text')
        const hashtags_a = this.getHashtagFromMessage(message_a)
        const hashtags_b = this.getHashtagFromMessage(message_b)
        return this.isDescending
          ? hashtags_b.length - hashtags_a.length
          : hashtags_a.length - hashtags_b.length;
      }
      if(type && type === 'userInCaption'){
        const message_a = get(a,'edge_media_to_caption.edges[0].node.text')
        const message_b = get(b,'edge_media_to_caption.edges[0].node.text')
        const users_a = this.getUserFromMessage(message_a)
        const users_b = this.getUserFromMessage(message_b)
        return this.isDescending
          ? users_b.length - users_a.length
          : users_a.length - users_b.length;
      }
      const res_a = get(a, field);
      const res_b = get(b, field);
      return this.isDescending ? res_b - res_a : res_a - res_b;
    });

    this.isDescending = !this.isDescending;
    const results = [...sortedResults]
    this.appService.setResults(results)
  }
  ngOnInit() {

  }
}
