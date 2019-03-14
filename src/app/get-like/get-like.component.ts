import { Component, OnInit } from '@angular/core';
import { Constants } from '../utils/Constants';

@Component({
  selector: 'app-get-like',
  templateUrl: './get-like.component.html',
  styleUrls: ['./get-like.component.css']
})
export class GetLikeComponent implements OnInit {
  public type = Constants.typeComponent.GET_LIKE_COMPONENT

  constructor() { }

  ngOnInit() {
  }

}
