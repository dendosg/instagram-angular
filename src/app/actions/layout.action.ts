import { Action } from "@ngrx/store";
import { APP_ROUTES } from "app/utils/Constants";

export enum LayoutActionTypes {
  SetCurrentRouteAction = "[Account] Set Current Route",
  SetCurrentInputTextAction = "[Account] Set Current Input"
}

export class SetCurrentRoute implements Action {
  public readonly type = LayoutActionTypes.SetCurrentRouteAction;
  constructor(public currentRoute: APP_ROUTES) {}
}

export class SetCurrentInputText implements Action {
  public readonly type = LayoutActionTypes.SetCurrentInputTextAction;
  constructor(public inputText: string, public currentRoute: APP_ROUTES) {}
}
export type LayoutActionsUnion = SetCurrentRoute | SetCurrentInputText;
