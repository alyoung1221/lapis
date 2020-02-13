import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  picture: string;
  name: string;
  age: number;
  hobbies: Array<object>;
  friends: Array<object>;
  friendSuggestions: Array<object>;

  constructor() { }

  ngOnInit() {
    this.getInformation();
  }

  getInformation() {
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
