import { Component, OnInit } from '@angular/core';
import { Constants } from '../utils/Constants';

@Component({
  selector: 'app-get-my-stories',
  templateUrl: './get-my-stories.component.html',
  styleUrls: ['./get-my-stories.component.css']
})
export class GetMyStoriesComponent implements OnInit {
  public type = Constants.typeComponent.GET_MY_STORIES

  constructor() { }

  ngOnInit() {
  }

}
