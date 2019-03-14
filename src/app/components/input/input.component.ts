import { Component, OnInit, Output, Input } from "@angular/core";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"]
})
export class InputComponent implements OnInit {
  @Input() public type: string;
  public inputValue: string;
  constructor() { }

  public get inputValues(): string[] {
    if (!this.inputValue) return [];
    return this.inputValue.split("\n").filter(item => item);
  }

  ngOnInit() { }
}
