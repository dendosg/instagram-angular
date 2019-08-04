import { CONTEXT_SEARCH } from './../../utils/Constants';
import { FacebookService } from './../../_service/facebook.service';
import { Component, OnInit, Input, ViewChild, OnDestroy } from "@angular/core";
import { InputComponent } from "../input/input.component";
import { OptionComponent } from "../option/option.component";
import { InstagramService } from "app/_service/instagram.service";
import { Constants, GET_MEDIA_TYPE } from "app/utils/Constants";
import { isArray } from "util";
import { sortBy, get } from "lodash";
import { NzMessageService } from "ng-zorro-antd";
import { sleep } from "app/utils/sleep";
import { AccountModel } from "model/account.model";
import { AppService } from "app/_service/app.service";
import { ActivatedRoute } from "@angular/router";
import { environment } from 'environments/environment';

export interface Task {
  input: string;
  account: AccountModel;
}
@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit, OnDestroy {
  @Input() type: string;
  @ViewChild(OptionComponent) public optionComponent: OptionComponent;
  @ViewChild(InputComponent) public inputComponent: InputComponent;
  public inputValues: string[] = [];
  public results: any[] = [];
  public working: Task[] = [];
  public done: Task[] = [];
  public isStop: boolean = false;
  public count: { [key: string]: number } = {};
  public total: { [key: string]: number } = {};
  public loading: { [key: string]: boolean } = {};

  constructor(
    private instagramService: InstagramService,
    private facebookService: FacebookService,
    private message: NzMessageService,
    private appService: AppService,
    private route: ActivatedRoute
    ) {
     this.appService.inputValuesSubject.subscribe(inputValues => this.inputValues = inputValues)
     this.appService.resultsSubject.subscribe(results => this.results = results)
    }

  ngOnInit() {
    // http://localhost:4200/media?query=huy,alo,dashdsadu
    this.route.queryParams
      .subscribe(params => {
        const query: string = params.query
        if(!query) return
        const keywords: string[] = query.split(',').filter(item => item)
        this.appService.setInputValues(keywords)
      });

   }

  public getPercentResult(input) {
    if(!this.total[input]) return 0
    return Math.ceil((this.count[input] / this.total[input]) * 100) || 0;
  }

  public getMyStories() {
    this.loading.content = true
    this.selectedAccounts.forEach(async account => {
      const task: Task = { input: '', account }
      this.working.push(task);
      const taskDone = (await this.instagramService.getMyStories({ cookie: account.cookie })).data
      
      this.working = this.working.filter(
        task => task.account.cookie !== account.cookie
      );
      this.done.push(task);
      
      const { statusCode, data } = taskDone
      if (statusCode !== 200) return console.log('Co loi xay ra')
      data.map(story => {
        const results = this.results.concat(story.items)
        this.appService.setResults(results)
      })
      if (this.done.length === this.selectedAccounts.length){
        const results = sortBy(this.results,'expiring_at_timestamp')
        this.appService.setResults(results)
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
    this.appService.setResults([])
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
          access_token: account.access_token,
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

  public getResultForOneInput({ input, cookie, access_token, after }) {
    console.log('first after :', after);
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
          case GET_MEDIA_TYPE.USER:
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
          case GET_MEDIA_TYPE.HASHTAG:
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
          case GET_MEDIA_TYPE.LOCATION:
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
          case GET_MEDIA_TYPE.FACEBOOK_PAGE:
            query = this.facebookService.getPostsOfPage({
              access_token,
              keyword: input,
              after
            });
            break  
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
      case Constants.typeComponent.GET_HASHTAG_INFO_COMPONENT:
        query = this.instagramService.getHashtagInfo({ cookie, hashtag: input })
        break;  
      case Constants.typeComponent.SEARCH_COMPONENT:
        if(this.optionValue.contextSearch === CONTEXT_SEARCH.PLACE_FACEBOOK){
          query = this.facebookService.searchPlace({
            access_token,
            keyword: input,
            after
          });
        } else {
          query = this.instagramService.search({
            cookie, query: input, context: this.optionValue.contextSearch
          })
        }
        break  
      default:
        break;
    }

    return query.then(async ({ data: { data, statusCode } }) => {
      if (statusCode === 404) return Promise.resolve({ cookie, input });
      if (statusCode !== 200 && !data) return Promise.reject("getResultForOneInput error");
      if (!data) return Promise.resolve({ cookie, input });
      if (!data.data) {
        const results = isArray(data) ? this.results.concat(data) : this.results.concat([data]);
        this.appService.setResults(results)
        return Promise.resolve({ cookie, input });
      }
      const result = data.data;
      // console.log('data', data)
      this.count[input] += result.length;
      const results = this.results.concat(result);
      this.appService.setResults(results)
      if (!data.page_info && !data.paging) return Promise.resolve({ cookie, input });

      const count = get(data,'count')
      const end_cursor = get(data,'page_info.end_cursor')
      const has_next_page = get(data,'page_info.has_next_page')
      const after = get(data, "paging.cursors.after"); // FOR FACEBOOK SEARCH
      this.total[input] = count;
      if (!has_next_page && !after) return Promise.resolve({ cookie, input });
      await sleep(1000)
      return this.getResultForOneInput({ input, cookie, access_token, after: (end_cursor || after) });
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
    this.appService.setResults([])
  }
  public get optionValue() {
    return this.optionComponent.optionValue;
  }

  public get selectedAccounts(): AccountModel[] {
    return this.optionComponent.selectedAccounts;
  }
  ngOnDestroy(): void {
    this.stop()
  }
}
