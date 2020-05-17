import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  search: string;
  users = [];

  constructor(private db: AngularFirestore, private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.search = params['s'];
    });
    this.searchUsers(this.search);
    console.log(this.users);
  }

  searchUsers(search) {
    console.log(search);
    this.db.collection('users', ref => ref.where('hobbies', 'array-contains', search)).valueChanges().subscribe(data => {
      this.users.push(data);
    });
  }
}
