import { Component, OnInit, Output, Input } from "@angular/core";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"]
})
export class InputComponent implements OnInit {
  public inputValue;
  @Input() name;
  @Input() public type: string;
  constructor() {}

  ngOnInit() {}
}
