import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { GetMediaComponent } from './get-media/get-media.component';
import { GetLikeComponent } from './get-like/get-like.component';
import { GetCommentComponent } from './get-comment/get-comment.component';
import { GetUserInfoComponent } from './get-user-info/get-user-info.component';
import { GetMediaInfoComponent } from './get-media-info/get-media-info.component';
import { GetFollowingComponent } from './get-following/get-following.component';
import { GetFollowerComponent } from './get-follower/get-follower.component';
import { NavbarComponent } from './components/navbar/navbar.component';

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
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
