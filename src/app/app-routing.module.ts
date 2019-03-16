import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { GetCommentComponent } from "./get-comment/get-comment.component";
import { GetFollowerComponent } from "./get-follower/get-follower.component";
import { GetFollowingComponent } from "./get-following/get-following.component";
import { GetLikeComponent } from "./get-like/get-like.component";
import { GetMediaComponent } from "./get-media/get-media.component";
import { GetMediaInfoComponent } from "./get-media-info/get-media-info.component";
import { GetUserInfoComponent } from "./get-user-info/get-user-info.component";
import { SearchComponent } from "./search/search.component";
import { GetMyStoriesComponent } from "./get-my-stories/get-my-stories.component";

const routes: Routes = [
  { path: "comment", component: GetCommentComponent },
  { path: "following", component: GetFollowingComponent },
  { path: "follower", component: GetFollowerComponent },
  { path: "like", component: GetLikeComponent },
  { path: "media", component: GetMediaComponent },
  { path: "media-info", component: GetMediaInfoComponent },
  { path: "user-info", component: GetUserInfoComponent },
  { path: "search", component: SearchComponent },
  { path: "get-my-stories", component: GetMyStoriesComponent },
  { path: "", component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
