import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SearchComponent } from "./search/search.component";
import { GetMediaComponent } from "./get-media/get-media.component";
import { GetLikeComponent } from "./get-like/get-like.component";
import { GetCommentComponent } from "./get-comment/get-comment.component";
import { GetUserInfoComponent } from "./get-user-info/get-user-info.component";
import { GetMediaInfoComponent } from "./get-media-info/get-media-info.component";
import { GetFollowingComponent } from "./get-following/get-following.component";
import { GetFollowerComponent } from "./get-follower/get-follower.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

import { ModalModule } from "ngx-modal";
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { LayoutComponent } from './components/layout/layout.component';
import { InputComponent } from './components/input/input.component';
import { OptionComponent } from './components/option/option.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ResultComponent } from './components/result/result.component';
import { GetMyStoriesComponent } from './get-my-stories/get-my-stories.component';
import {ContextMenuModule} from 'ngx-contextmenu';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    GetMediaComponent,
    GetLikeComponent,
    GetCommentComponent,
    GetUserInfoComponent,
    GetMediaInfoComponent,
    GetFollowingComponent,
    GetFollowerComponent,
    NavbarComponent,
    LayoutComponent,
    InputComponent,
    OptionComponent,
    ButtonsComponent,
    ResultComponent,
    GetMyStoriesComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    ModalModule, 
    NgZorroAntdModule, 
    FormsModule, 
    HttpClientModule, 
    BrowserAnimationsModule,
    ContextMenuModule.forRoot()
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule {}
