import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {
  @Input() public type: string;
  constructor() { }

  ngOnInit() {
  }
  public submit() {
    console.log('sss', this.type)
  }

}
