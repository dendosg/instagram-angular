import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }
  public onStop(){
    this.stop.emit()
  }
  public onSubmit() {
    this.submit.emit()
  }

}
