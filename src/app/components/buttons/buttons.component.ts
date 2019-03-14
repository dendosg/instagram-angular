import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {
  @Input() public type: string;
  @Output() public submit = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  public onSubmit() {
    this.submit.emit()
  }

}
