export interface HashtagFromApi {
  name: string;
  id: number;
  media_count: number;
  use_default_avatar: boolean;
  profile_pic_url: string;
  search_result_subtitle: string;
}

export class HashtagModel {
  public id: number;
  public name: string;
  public media_count: number;
  public profile_pic_url: string;
  public search_result_subtitle: string;
  constructor(h: HashtagFromApi) {
    this.id = h.id;
    this.name = h.name;
    this.media_count = h.media_count;
    this.profile_pic_url = h.profile_pic_url;
    this.search_result_subtitle = h.search_result_subtitle;
  }
}
