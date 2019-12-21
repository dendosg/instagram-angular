import { getOptionSelector, getInputSelector } from './../../reducers/layout.reducer';
import { AppService } from './../../_service/app.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { slice } from "lodash";
import { ClipboardService } from 'ngx-clipboard';
import { NzMessageService } from 'ng-zorro-antd';
import { Store, select } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { APP_ROUTES } from 'app/utils/Constants';
import { getCurrentRouteSelector } from 'app/reducers/layout.reducer';
@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {
  @Input() public loading;
  @Output() public submit = new EventEmitter();
  @Output() public stop = new EventEmitter();
  @Input() public isAllowToSubmit: boolean;
  public results: object[] = [];
  public currentRoute: APP_ROUTES;
  public optionValue;
  public inputText: string;
  constructor(
    private appService: AppService,
    private clipboardService: ClipboardService,
    private message: NzMessageService,
    private store: Store<AppState>
  ) {
    this.appService.resultsSubject.subscribe(results => this.results = results);
    this.store.pipe(select(getCurrentRouteSelector)).subscribe(currentRoute => this.currentRoute = currentRoute)
    this.store.pipe(select(getOptionSelector)).subscribe(optionValue => this.optionValue = optionValue)
    this.store.pipe(select(getInputSelector)).subscribe(inputText => this.inputText = inputText)
   }

  ngOnInit() {
  }
  public onStop(){
    this.stop.emit()
  }
  public onSubmit() {
  }
  public copyResults(type:'username' |'id' | 'shortcode' = 'shortcode') {
    const currentPage = this.appService.currentPage
    const start = (currentPage - 1) * 10;
    const end = start + 10;
    const resultCopy = slice(
      this.results.map(item => {
        if (type === "id") return item["id"] || item["pk"];
        return item[type]
      }),
      start,
      end
    ).filter(Boolean);
    console.log('resultCopy', resultCopy)
    if (!resultCopy.length) return;
    this.clipboardService.copyFromContent(resultCopy.join("\n"));
    this.message.success("Copied");
  }

}
