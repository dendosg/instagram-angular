import { Component, OnInit } from '@angular/core';
import { Constants } from '../utils/Constants';

@Component({
  selector: 'app-get-media',
  templateUrl: './get-media.component.html',
  styleUrls: ['./get-media.component.css']
})
export class GetMediaComponent implements OnInit {
  public type = Constants.typeComponent.GET_MEDIA_COMPONENT

  constructor() { }

  ngOnInit() {
  }

}
