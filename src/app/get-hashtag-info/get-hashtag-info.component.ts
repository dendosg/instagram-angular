import { Component, OnInit } from '@angular/core';
import { Constants } from '../utils/Constants';

@Component({
  selector: 'app-get-hashtag-info',
  templateUrl: './get-hashtag-info.component.html',
  styleUrls: ['./get-hashtag-info.component.scss']
})
export class GetHashtagInfoComponent implements OnInit {
  public type = Constants.typeComponent.GET_HASHTAG_INFO_COMPONENT

  constructor() { }

  ngOnInit() {
  }

}
