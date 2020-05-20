import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { AppComponent } from '../../app.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FriendsService } from '../../services/friends.service';
import { SuggestionsService } from '../../services/suggestions.service';
import { FriendrequestService } from 'src/app/services/friendrequest.service';
import { Router } from '@angular/router';
import firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  friendsLoaded = false;
  suggestionsLoaded = false;
  profile = {
    userID: '',
    firstName: '',
    lastName: '',
    picture: '',
    friends: [],
    hobbies: [],
    suggestions: [],
    major: '',
    gender: '',
    requests: {
      sent: [],
      received: [],
    },
  };
  constructor(
    private db: AngularFirestore,
    public fbAuth: AngularFireAuth,
    private friends: FriendsService,
    private requests: FriendrequestService,
    private suggestions: SuggestionsService,
    public router: Router,
    public app: AppComponent) {}

  ngOnInit() {
    this.app.setTitle("Profile");
    this.fbAuth.authState.subscribe(data => {
      if (data == null) {
        this.router.navigateByUrl("/login");
      }
      else {
        this.getProfileInfo(data.uid);
        this.profile.friends = this.friends.getFriends(data.uid);
        if (this.profile.friends) {
          this.friendsLoaded = true;
        }
        this.profile.suggestions = this.suggestions.getSuggestions(data.uid);
        if (this.profile.suggestions) {
          this.suggestionsLoaded = true;
        }
        console.log(this.profile.suggestions);
        this.profile.requests.received = this.requests.getReceivedFriendRequests(data.uid);
        this.profile.requests.sent = this.requests.getSentFriendRequests(data.uid);
        console.log('USER ID: ' + data.uid);
        console.log('RECEIVED: ' + this.profile.requests.received);
        console.log('SENT: ' + this.profile.requests.sent);
      }
    });
  }

  getProfileInfo(id) {
    const document = this.db.collection('users').doc(id);
    document.get().subscribe((userData => {
      const user = userData.data();
      this.profile.userID = id;
      this.profile.firstName = user.first;
      this.profile.lastName = user.last;
      this.profile.gender = user.gender;
      this.profile.major = user.major;
      this.profile.picture = user.picture;
      this.profile.hobbies = user.hobbies;
    }));
  }

  deleteUser() {  
    this.db.collection('friends').doc(firebase.auth().currentUser.uid).delete();
    this.db.collection('suggestions').doc(firebase.auth().currentUser.uid).delete();
    this.db.collection('users').doc(firebase.auth().currentUser.uid).delete().catch(function(error) {
      // An error happened.
      window.alert(error);
    });
    // User deleted.
    firebase.auth().currentUser.delete().then(function() {
      firebase.auth().signOut();
    }).catch(function(error) {
      // An error happened.
      window.alert(error);
    });
  }
}