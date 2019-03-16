import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {
  @Input() public type: string;
  @Input() public loading;
  @Output() public submit = new EventEmitter();
  @Input() public isAllowToSubmit: boolean;
  constructor() { }

  ngOnInit() {
  }

  public onSubmit() {
    this.submit.emit()
  }

}
