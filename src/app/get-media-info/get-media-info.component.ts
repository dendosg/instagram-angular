import { Component, OnInit } from '@angular/core';
import { Constants } from '../utils/Constants';

@Component({
  selector: 'app-get-media-info',
  templateUrl: './get-media-info.component.html',
  styleUrls: ['./get-media-info.component.scss']
})
export class GetMediaInfoComponent implements OnInit {
  public type = Constants.typeComponent.GET_MEDIA_INFO_COMPONENT

  constructor() { }

  ngOnInit() {
  }

}
