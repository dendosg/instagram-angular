import { Component, OnInit } from '@angular/core';
import { Constants } from '../utils/Constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public type = Constants.typeComponent.SEARCH_COMPONENT

  constructor() { }

  ngOnInit() {
  }

}
