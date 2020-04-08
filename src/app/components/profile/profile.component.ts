import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FriendsService } from '../../services/friends.service';
import { SuggestionsService } from '../../services/suggestions.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  friendsLoaded = false;
  suggestionsLoaded = false;
  profile = {
    id: '',
    firstName: '',
    lastName: '',
    picture: '',
    friends: [],
    hobbies: [],
    suggestions: [],
    major: '',
    gender: ''
  };
  constructor(
    private db: AngularFirestore,
    public fbAuth: AngularFireAuth,
    private friends: FriendsService,
    private suggestions: SuggestionsService) {}

  ngOnInit() {
    this.fbAuth.authState.subscribe(data => {
      this.getProfileInfo(data.uid);
      this.profile.friends = this.friends.getFriends(data.uid);
      if (this.profile.friends) {
        this.friendsLoaded = true;
      }
      this.profile.suggestions = this.suggestions.getSuggestions(data.uid);
      if (this.profile.suggestions) {
        this.suggestionsLoaded = true;
      }
    });
  }
  getProfileInfo(id) {
    const document = this.db.collection('users').doc(id);
    document.get().subscribe((userData => {
      const user = userData.data();
      this.profile.id = id;
      this.profile.firstName = user.first;
      this.profile.lastName = user.last;
      this.profile.gender = user.gender;
      this.profile.major = user.major;
      this.profile.picture = user.picture;
      this.profile.hobbies = user.hobbies;
    }));
  }
}
