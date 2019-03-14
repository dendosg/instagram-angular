import { Component, OnInit } from '@angular/core';
import { Constants } from '../utils/Constants';

@Component({
  selector: 'app-get-follower',
  templateUrl: './get-follower.component.html',
  styleUrls: ['./get-follower.component.css']
})
export class GetFollowerComponent implements OnInit {
  public type = Constants.typeComponent.GET_FOLLOWER_COMPONENT

  constructor() { }

  ngOnInit() {
  }

}
