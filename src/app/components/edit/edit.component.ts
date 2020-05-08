import { Component, OnInit, ComponentFactoryResolver, ViewEncapsulation } from '@angular/core';
import { AppComponent } from '../../app.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  friendsLoaded = false;
  suggestionsLoaded = false;
  profile = {
    id: '',
    firstName: '',
    lastName: '',
    bio: '',
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
    public app: AppComponent) {}

  ngOnInit() {
    this.app.setTitle("Edit Profile");
    this.fbAuth.authState.subscribe(data => {
      this.getProfileInfo(data.uid);
      console.log('USER ID: ' + data.uid);
    });
  }
  getProfileInfo(id) {
    const document = this.db.collection('users').doc(id);
    document.get().subscribe((userData => {
      const user = userData.data();
      this.profile.id = id;
      this.profile.firstName = user.first;
      this.profile.lastName = user.last;
      this.profile.bio = user.bio;
      this.profile.gender = user.gender;
      this.profile.major = user.major;
      this.profile.picture = user.picture;
      this.profile.hobbies = user.hobbies == undefined ? user.hobbies : user.hobbies.split(", ");
    }));
  }
}