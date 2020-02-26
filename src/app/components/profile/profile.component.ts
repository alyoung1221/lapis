import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsercardComponent } from 'src/app/shared/usercard/usercard.component';
import { FriendsService } from '../../services/friends.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  picture: string;
  name: string;
  age: number;
  friends: object[];
  friendSuggestions: object[];

  constructor(private db: AngularFirestore, private data: FriendsService) { }

  ngOnInit() {
    let friend = this.data.getRandomFriends().subscribe(val => {
      console.log(val);
    });
    this.getInformation();
    // console.log(this.db.collection('test').valueChanges().subscribe(val => console.log(val)));
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
      },
    ];
    this.picture ? this.picture = this.picture : this.picture = '/assets/pictures/default_picture.png';
    this.name ? this.name = this.name : this.name = 'John Smith';
    this.age ? this.age = this.age : this.age = 21;
  }
}
