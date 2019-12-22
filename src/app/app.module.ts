import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ClipboardModule } from "ngx-clipboard";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

import { ModalModule } from "ngx-modal";
import { NgZorroAntdModule, NZ_I18N, en_US } from "ng-zorro-antd";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
import { LayoutComponent } from "./components/layout/layout.component";
import { InputComponent } from "./components/input/input.component";
import { OptionComponent } from "./components/option/option.component";
import { ButtonsComponent } from "./components/buttons/buttons.component";
import { ResultComponent } from "./components/result/result.component";
import { ContextMenuModule } from "ngx-contextmenu";
import { metaReducers, reducers } from "./reducers/index";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreModule } from "@ngrx/store";
import { AppEffects } from "./effects";
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LayoutComponent,
    InputComponent,
    OptionComponent,
    ButtonsComponent,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ContextMenuModule.forRoot(),
    ClipboardModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(AppEffects),
    StoreDevtoolsModule.instrument({
      maxAge: 200,
      name: "Instagram Store"
    })
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule {}
