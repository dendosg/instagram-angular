import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { InputComponent } from "../input/input.component";
import { OptionComponent } from "../option/option.component";
import { AccountModel } from "src/model/account.model";
import { InstagramService } from "src/app/_service/instagram.service";
import { Constants } from "src/app/utils/Constants";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"]
})
export class LayoutComponent implements OnInit {
  @ViewChild(OptionComponent) public optionComponent: OptionComponent;
  @Input() type: string;
  @ViewChild(InputComponent) public inputComponent: InputComponent;

  // Data of app
  constructor(
    private instagramService: InstagramService
  ) { }

  ngOnInit() { }

  public submit() {
    switch (this.type) {
      case Constants.type.GET_COMMENT:
        console.log('get comment')
        break;
      default:
        console.log('default')
        break;
    }
    return 
    this.instagramService.getFollower({ cookie: this.selectedAccounts[0].cookie, userId: '22776518' }).
      then(({ data }) => {
        console.log('data', data)
      })
  }

  public get optionValue(): object {
    return this.optionComponent.optionValue;
  }

  public get inputValues(): string[] {
    return this.inputComponent.inputValues || [];
  }
  public get selectedAccounts(): AccountModel[] {
    return this.optionComponent.selectedAccounts;
  }
}
