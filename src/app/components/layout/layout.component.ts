import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { InputComponent } from "../input/input.component";
import { OptionComponent } from "../option/option.component";
import { AccountModel } from "src/model/account.model";
import { InstagramService } from "src/app/_service/instagram.service";
import { Constants } from "src/app/utils/Constants";
import { isArray } from "util";
import lodash from 'lodash';
import { NzMessageService } from "ng-zorro-antd";
import { sleep } from "src/app/utils/sleep";

export interface Task {
  input: string;
  account: AccountModel;
}
@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"]
})
export class LayoutComponent implements OnInit {
  @Input() type: string;
  @ViewChild(OptionComponent) public optionComponent: OptionComponent;
  @ViewChild(InputComponent) public inputComponent: InputComponent;
  public results: any[] = [];
  public working: Task[] = [];
  public done: Task[] = [];
  public isStop: boolean = false;
  public count: { [key: string]: number } = {};
  public total: { [key: string]: number } = {};
  public loading: { [key: string]: boolean } = {};

  // Data of app
  constructor(
    private instagramService: InstagramService,
    private message: NzMessageService
    ) { }

  ngOnInit() { }

  public getPercentResult(input) {
    return Math.ceil((this.count[input] / this.total[input]) * 100) || 0;
  }

  public getMyStories() {
    this.loading.content = true
    this.selectedAccounts.forEach(async account => {
      const task: Task = { input: null, account }
      this.working.push(task);
      const taskDone = (await this.instagramService.getMyStories({ cookie: account.cookie })).data
      
      this.working = this.working.filter(
        task => task.account.cookie !== account.cookie
      );
      this.done.push(task);
      
      const { statusCode, data } = taskDone
      if (statusCode !== 200) return console.log('Co loi xay ra')
      data.map(story => this.results = this.results.concat(story.items))
      if (this.done.length === this.selectedAccounts.length){
        this.results = lodash.sortBy(this.results,'expiring_at_timestamp')
        return this.loading.content = false
      } 
    })
  }

  public stop() {
    if (this.loading.content) {
      this.loading.content = false
      this.isStop = true
    }
  }
  public submit(){
    this.working = []
    this.done = []
    this.results = []
    this.isStop = false
    this.onSubmit()
  }
  public onSubmit() {
    if (this.type === Constants.typeComponent.GET_MY_STORIES) return this.getMyStories()
    this.loading.content = true;
    if (this.done.length === this.inputValues.length)
      return (this.loading.content = false);
    this.selectedAccounts.forEach(async account => {
      const input = this.inputValues.filter(
        value =>
          !this.working.map(task => task.input).includes(value) &&
          !this.done.map(task => task.input).includes(value)
      )[0];

      if (!input) return;

      // Check is acocunt working
      const isFreeAccount = this.working.every(
        task => task.account._id !== account._id
      );
      if (!isFreeAccount) return console.log("Working, choose another account");

      const task: Task = { input, account };
      this.working.push(task);
      try {
        this.count[input] = 0;
        const taskDone = await this.getResultForOneInput({
          cookie: account.cookie,
          input,
          after: null
        });

        this.working = this.working.filter(
          task => task.input !== taskDone.input
        );
        this.done.push(taskDone);
        this.onSubmit();
      } catch (error) {
        console.log("loi cmnr", error);
      }
    });
  }

  public getResultForOneInput({ input, cookie, after }) {
    if (this.isStop) return this.message.info('Stop')
    let query;
    switch (this.type) {
      case Constants.typeComponent.GET_COMMENT_COMPONENT:
        query = this.instagramService.getComment({
          cookie,
          shortcode: input,
          after
        });
        break;
      case Constants.typeComponent.GET_FOLLOWER_COMPONENT:
        query = this.instagramService.getFollower({
          cookie,
          userId: input,
          after
        });
        break;
      case Constants.typeComponent.GET_FOLLOWING_COMPONENT:
        query = this.instagramService.getFollowing({
          cookie,
          userId: input,
          after
        });
        break;
      case Constants.typeComponent.GET_LIKE_COMPONENT:
        query = this.instagramService.getLikerOfMedia({
          cookie,
          shortcode: input,
          after
        });
        break;
      case Constants.typeComponent.GET_MEDIA_COMPONENT:
        switch (this.optionValue.getMediaOf) {
          case "user":
            if (this.optionValue.isGetTaggedMedia) {
              query = this.instagramService.getMediaTaggedOfUser({
                cookie,
                userId: input,
                after
              })
              break;
            }
            query = this.instagramService.getMediaOfUser({
              cookie,
              userId: input,
              after
            });
            break;
          case "hashtag":
            if (this.optionValue.isGetTopMedia) {
              query = this.instagramService.getTopMediaOfHashtag({
                cookie,
                tag_name: input
              })
              break;
            }
            query = this.instagramService.getMediaOfHashtag({
              cookie,
              tag_name: input,
              after
            });
            break;
          case "location":
            if (this.optionValue.isGetTopMedia) {
              query = this.instagramService.getTopMediaOfLocation({
                cookie, locationId: input
              })
              break
            }
            query = this.instagramService.getMediaOfLocation({
              cookie,
              locationId: input,
              after
            });
            break;
          default:
            break;
        }
        break;
      case Constants.typeComponent.GET_MEDIA_INFO_COMPONENT:
        query = this.instagramService.getMediaInfo({
          cookie,
          shortcode: input
        });
        break;
      case Constants.typeComponent.GET_USER_INFO_COMPONENT:
        if (Number(input)) {
          query = this.instagramService.getUserById({
            cookie,
            userId: input
          });
          break;
        }
        query = this.instagramService.getUserByUsername({
          cookie,
          username: input
        });
        break;
      case Constants.typeComponent.SEARCH_COMPONENT:
        query = this.instagramService.search({
          cookie, query: input, context: this.optionValue.contextSearch
        })
        break  
      default:
        break;
    }

    return query.then(async ({ data: { data, statusCode } }) => {
      if (statusCode !== 200 && !data) return Promise.reject("getResultForOneInput error");
      if (!data) return Promise.resolve({ cookie, input });
      if (!data.data) {
        this.results = isArray(data) ? this.results.concat(data) : this.results.concat([data]);
        return Promise.resolve({ cookie, input });
      }
      const result = data.data;
      console.log('data', data)
      this.count[input] += result.length;
      this.results = this.results.concat(result);

      if (!data.page_info) return Promise.resolve({ cookie, input });

      const {
        count,
        page_info: { end_cursor, has_next_page }
      } = data;
      this.total[input] = count;
      if (!has_next_page) return Promise.resolve({ cookie, input });
      await sleep(1000)
      return this.getResultForOneInput({ input, cookie, after: end_cursor });
    });
  }
  public get isAllowToSubmit() {
    if (
      this.type === Constants.typeComponent.GET_MEDIA_COMPONENT &&
      !this.optionValue.getMediaOf
    )
      return false;
    if (this.type === Constants.typeComponent.GET_MY_STORIES) return this.selectedAccounts.length
    return this.inputValues.length && this.selectedAccounts.length;
  }
  public resetResults(){
    this.results = []
  }
  public get optionValue() {
    return this.optionComponent.optionValue;
  }

  public get inputValues(): string[] {
    return this.inputComponent.inputValues || [];
  }
  public get selectedAccounts(): AccountModel[] {
    return this.optionComponent.selectedAccounts;
  }
}
