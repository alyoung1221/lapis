import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = [];
  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.getUsers();
    console.log(this.users);
  }

  getUsers() {
    this.db.collection('users').valueChanges().subscribe(data => {
      this.users.push(data);
    });
  }
}
