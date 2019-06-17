import { Injectable } from '@angular/core';
import { uniq } from 'lodash'
@Injectable({
  providedIn: 'root'
})
export class AppService {
  public inputValues: string[] = [];
  public optionValue:
  {
    getMediaOf: string,
    contextSearch: 'hashtag' | 'place' | 'user' | 'blended',
    isGetTopMedia: boolean,
    isGetTaggedMedia: boolean
  } = {
    getMediaOf: 'hashtag',
    contextSearch: 'hashtag' ,
    isGetTopMedia: false,
    isGetTaggedMedia: false
  }
  constructor() { }
  public setInputValues(input: string) {
    if (!input) return this.inputValues = [];
    this.inputValues = uniq(input.split("\n").filter(item => item));
  }
}
