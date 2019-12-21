import { Component, ViewChild } from "@angular/core";
import { ContextMenuComponent } from "ngx-contextmenu";
import { Store } from "@ngrx/store";
import { AppState } from "./reducers";
import { LoadAccounts } from "./actions/account.action";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
  constructor(private store: Store<AppState>) {
    this.store.dispatch(new LoadAccounts());
  }
  public items = [
    { name: "John", otherProperty: "Foo" },
    { name: "Joe", otherProperty: "Bar" }
  ];
  title = "instagram-by-angular";
  public tagHtml = `<span class='highlight'>this is hightlosht</span>`;
  public showMessage(message: string) {
    console.log(message);
  }
}
