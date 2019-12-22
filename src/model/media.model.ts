import { UserModel } from "./user.model";
import { PlaceModel } from "./place.model";

// export interface MediaModel {
//   _id: string;
//   link: string;
//   caption: string;
//   likesCount: number;
//   commentsCount: number;
//   isVideo: boolean;
//   location: string;
//   owner: string;
//   takenAt: string;
// }

export interface Dimensions {
  height: number;
  width: number;
}

export interface DisplayResource {
  src: string;
  config_width: number;
  config_height: number;
}

export interface EdgeMediaToTaggedUser {
  edges: any[];
}

export interface Node {
  text: string;
}

export interface Edge {
  node: Node;
}

export interface EdgeMediaToCaption {
  edges: Edge[];
}

export interface PageInfo {
  has_next_page: boolean;
  end_cursor?: any;
}

export interface EdgeMediaToParentComment {
  count: number;
  page_info: PageInfo;
  edges: any[];
}

export interface EdgeMediaPreviewComment {
  count: number;
  edges: any[];
}

export interface EdgeMediaPreviewLike {
  count: number;
  edges: any[];
}

export interface EdgeMediaToSponsorUser {
  edges: any[];
}

export interface Owner {
  id: string;
  is_verified: boolean;
  profile_pic_url: string;
  username: string;
  blocked_by_viewer: boolean;
  followed_by_viewer: boolean;
  full_name: string;
  has_blocked_viewer: boolean;
  is_private: boolean;
  is_unpublished: boolean;
  requested_by_viewer: boolean;
}

export interface EdgeWebMediaToRelatedMedia {
  edges: any[];
}

export interface MediaFromApi {
  __typename: string;
  id: string;
  shortcode: string;
  dimensions: Dimensions;
  gating_info?: any;
  fact_check_overall_rating?: any;
  fact_check_information?: any;
  media_preview: string;
  display_url: string;
  display_resources: DisplayResource[];
  accessibility_caption: string;
  is_video: boolean;
  tracking_token: string;
  edge_media_to_tagged_user: EdgeMediaToTaggedUser;
  edge_media_to_caption: EdgeMediaToCaption;
  caption_is_edited: boolean;
  has_ranked_comments: boolean;
  edge_media_to_parent_comment: EdgeMediaToParentComment;
  edge_media_preview_comment: EdgeMediaPreviewComment;
  comments_disabled: boolean;
  taken_at_timestamp: Date;
  edge_media_preview_like: EdgeMediaPreviewLike;
  edge_media_to_sponsor_user: EdgeMediaToSponsorUser;
  location?: any;
  viewer_has_liked: boolean;
  viewer_has_saved: boolean;
  viewer_has_saved_to_collection: boolean;
  viewer_in_photo_of_you: boolean;
  viewer_can_reshare: boolean;
  owner: UserModel;
  is_ad: boolean;
  edge_web_media_to_related_media: EdgeWebMediaToRelatedMedia;
}

export class MediaModel {
  public id: string;
  public accessibility_caption: string;
  public display_url: string;
  public like_count: number;
  public comment_count: number;
  public caption: string;
  public tagged_users: UserModel[];
  public is_video: boolean;
  public location: any;
  public owner: UserModel;
  public shortcode: string;
  public taken_at_timestamp: Date;
  constructor(m: MediaFromApi) {
    this.id = m.id;
    this.accessibility_caption = m.accessibility_caption;
    this.display_url = m.display_url;
    this.like_count = m.edge_media_preview_like.count;
    this.comment_count = m.edge_media_preview_comment.count;
    this.caption = m.edge_media_to_caption.edges[0].node.text;
    this.tagged_users = m.edge_media_to_tagged_user.edges.map(
      edge => edge.node.user
    );
    this.is_video = m.is_video;
    this.location = m.location;
    this.owner = m.owner;
    this.shortcode = m.shortcode;
    this.taken_at_timestamp = m.taken_at_timestamp;
  }
}
