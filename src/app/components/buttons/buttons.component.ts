import { AppService } from './../../_service/app.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { slice } from "lodash";
import { ClipboardService } from 'ngx-clipboard';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {
  @Input() public type: string;
  @Input() public loading;
  @Output() public submit = new EventEmitter();
  @Output() public stop = new EventEmitter();
  @Input() public isAllowToSubmit: boolean;
  public results: object[] = []
  constructor(
    private appService: AppService,
    private clipboardService: ClipboardService,
    private message: NzMessageService
  ) {
    this.appService.resultsSubject.subscribe(results => this.results = results)
   }

  ngOnInit() {
  }
  public onStop(){
    this.stop.emit()
  }
  public onSubmit() {
    this.submit.emit()
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
