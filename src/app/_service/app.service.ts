import { Injectable } from '@angular/core';
import { uniq } from 'lodash'
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  public currentPage: number;
  public inputValuesSubject: Subject<any[]> = new Subject<any[]>();
  public resultsSubject: Subject<object[]> = new Subject<object[]>();
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
  public setCurrentIndexPage(page){
    this.currentPage = page
  }
  public setInputValues(keywords: string[]) {
    this.inputValuesSubject.next(keywords || [])
  }
  public setResults(results: object[]){
    this.resultsSubject.next(results)
  }
}
