import { Component, OnInit } from '@angular/core';
import { Constants } from '../utils/Constants';

@Component({
  selector: 'app-get-user-info',
  templateUrl: './get-user-info.component.html',
  styleUrls: ['./get-user-info.component.css']
})
export class GetUserInfoComponent implements OnInit {
  public type = Constants.typeComponent.GET_USER_INFO_COMPONENT

  constructor() { }

  ngOnInit() {
  }

}
