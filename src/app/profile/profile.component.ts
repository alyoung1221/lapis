import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsercardComponent } from 'src/app/shared/usercard/usercard.component';
import { HobbycardComponent } from 'src/app/shared/hobbycard/hobbycard.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  picture: string;
  name: string;
  age: number;
  hobbies: Array<string>;
  friends: Array<object>;
  friendSuggestions: Array<object>;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.getInformation();
    // console.log(this.db.collection('test').valueChanges().subscribe(val => console.log(val))); 
  }

  getInformation() {
    this.hobbies = ['soccer', 'music', 'cooking', 'technology', 'movies'];
    this.friends = [
      {
        name: 'Eric Mahoney',
        picture: '/assets/pictures/eric.jpg',
        age: 21,
        hobbies: [' Cooking', ' Soccer', ' Music'],
        major: 'Information Technology'
      },
      {
        name: 'Robert Downey Jr.',
        picture: '/assets/pictures/sample1.jpg',
        age: 54,
        hobbies: [' Movies', ' Technology', ' Music'],
        major: 'Theater'
      },
    ];
    this.friendSuggestions = [
      {
        name: 'Bill Gates',
        picture: '/assets/pictures/sample2.jpg',
        age: 64,
        hobbies: [' Microsoft', ' Technology', ' Reading'],
        major: 'Computer Science'
      }
    ];
    this.picture ? this.picture = this.picture : this.picture = '/assets/pictures/default_picture.png';
    this.name ? this.name = this.name : this.name = 'John Smith';
    this.age ? this.age = this.age : this.age = 21;
  }

}
