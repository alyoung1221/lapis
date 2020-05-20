import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  users: any;

  constructor() { }

  ngOnInit() {
  }

  searchUsers() {
    return true;
  }

  advancedSearch() {
    return true;
  }

}
