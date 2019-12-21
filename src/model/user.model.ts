export interface BiographyWithEntities {
  raw_text: string;
  entities: any[];
}

export interface HdProfilePicVersion {
  width: number;
  height: number;
  url: string;
}

export interface HdProfilePicUrlInfo {
  url: string;
  width: number;
  height: number;
}

export interface UserModel {
  pk: number;
  username: string;
  full_name: string;
  is_private: boolean;
  profile_pic_url: string;
  profile_pic_id: string;
  is_verified: boolean;
  has_anonymous_profile_picture: boolean;
  media_count: number;
  geo_media_count: number;
  follower_count: number;
  following_count: number;
  following_tag_count: number;
  biography: string;
  biography_with_entities: BiographyWithEntities;
  external_url: string;
  external_lynx_url: string;
  has_biography_translation: boolean;
  total_igtv_videos: number;
  total_ar_effects: number;
  usertags_count: number;
  is_favorite: boolean;
  is_favorite_for_stories: boolean;
  is_favorite_for_highlights: boolean;
  live_subscription_status: string;
  is_interest_account: boolean;
  has_recommend_accounts: boolean;
  has_chaining: boolean;
  hd_profile_pic_versions: HdProfilePicVersion[];
  hd_profile_pic_url_info: HdProfilePicUrlInfo;
  mutual_followers_count: number;
  show_shoppable_feed: boolean;
  shoppable_posts_count: number;
  can_be_reported_as_fraud: boolean;
  merchant_checkout_style: string;
  has_highlight_reels: boolean;
  direct_messaging: string;
  fb_page_call_to_action_id: string;
  address_street: string;
  business_contact_method: string;
  category: string;
  city_id: number;
  city_name: string;
  contact_phone_number: string;
  is_call_to_action_enabled: boolean;
  latitude: number;
  longitude: number;
  public_email: string;
  public_phone_country_code: string;
  public_phone_number: string;
  zip: string;
  instagram_location_id: string;
  is_business: boolean;
  account_type: number;
  can_hide_category: boolean;
  can_hide_public_contacts: boolean;
  should_show_category: boolean;
  should_show_public_contacts: boolean;
  should_show_tabbed_inbox: boolean;
  can_see_primary_country_in_settings: boolean;
  include_direct_blacklist_status: boolean;
  is_potential_business: boolean;
  is_bestie: boolean;
  has_unseen_besties_media: boolean;
  show_account_transparency_details: boolean;
  show_leave_feedback: boolean;
  auto_expand_chaining: boolean;
  highlight_reshare_disabled: boolean;
  show_post_insights_entry_point: boolean;
  about_your_account_bloks_entrypoint_enabled: boolean;
}
