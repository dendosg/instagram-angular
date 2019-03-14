import { Component, OnInit } from '@angular/core';
import { Constants } from '../utils/Constants';

@Component({
  selector: 'app-get-following',
  templateUrl: './get-following.component.html',
  styleUrls: ['./get-following.component.css']
})
export class GetFollowingComponent implements OnInit {
  public type = Constants.typeComponent.GET_FOLLOWING_COMPONENT

  constructor() { }

  ngOnInit() {
  }

}
