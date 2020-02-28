import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsercardComponent } from 'src/app/shared/usercard/usercard.component';
import { FriendsService } from '../../services/friends.service';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile = {
    firstName: '',
    lastName: '',
    picture: '',
    friends: [],
    hobbies: [],
    suggestions: [],
    major: '',
    gender: ''
  };
  constructor(private db: AngularFirestore, public fbAuth: AngularFireAuth) {}

  ngOnInit() {
    this.fbAuth.authState.subscribe(data => {
      const document = this.db.collection('users').doc(data.uid);
      document.get().subscribe((userData => {
        const user = userData.data();
        this.profile.firstName = user.first;
        this.profile.lastName = user.last;
        this.profile.gender = user.gender;
        this.profile.major = user.major;
        this.profile.picture = user.picture;
        this.profile.hobbies = user.hobbies;
        this.profile.friends = user.friends;
        this.profile.suggestions = user.suggestions;
      }));
    });
  }
}
