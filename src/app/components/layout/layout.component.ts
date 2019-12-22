import { CONTEXT_SEARCH, APP_ROUTES } from "./../../utils/Constants";
import { Component, OnInit, Input, ViewChild, OnDestroy } from "@angular/core";
import { AccountModel } from "model/account.model";
import { ActivatedRoute } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { AppState } from "app/reducers";
import { SetCurrentRoute } from "app/actions/layout.action";

export interface Task {
  input: string;
  account: AccountModel;
}
@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    // http://localhost:4200/media?query=huy,alo,dashdsadu

    this.route.params.subscribe(({ routeType }: { routeType: APP_ROUTES }) =>
      this.store.dispatch(new SetCurrentRoute(routeType))
    );
  }

  ngOnDestroy(): void {}
}
