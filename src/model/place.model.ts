export interface Location {
  pk: number;
  name: string;
  address: string;
  city: string;
  short_name: string;
  lng: number;
  lat: number;
  external_source: string;
  facebook_places_id: number;
}
export interface PlaceFromApi {
  // _id: string;
  // shortName: string;
  // subtitle: string;
  // position: string;
  // facebookLocation: string

  // pk: number;
  // name: string;
  // address: string;
  // city: string;
  // short_name: string;
  // lng: number;
  // lat: number;
  // external_source: string;
  // facebook_places_id: number;

  location: Location;
  title: string;
  subtitle: string;
  media_bundles: any[];
  slug: string;
}

export class PlaceModel {
  public id: number;
  public name: string;
  public slug: string;
  public lng: number;
  public lat: number;
  public facebook_places_id: number;
  public address: string;
  public city: string;
  public external_source: string;
  public short_name: string;
  constructor(p: PlaceFromApi) {
    this.id = p.location.pk
    this.name = p.location.name;
    this.slug = p.slug;
    this.lng = p.location.lng;
    this.lat = p.location.lat;
    this.facebook_places_id = p.location.facebook_places_id;
    this.address = p.location.address;
    this.city = p.location.city;
    this.external_source = p.location.external_source;
    this.short_name = p.location.short_name;
  }
}
