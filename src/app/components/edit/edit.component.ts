import { Component, OnInit, ComponentFactoryResolver, ViewEncapsulation } from '@angular/core';
import { AppComponent } from '../../app.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  userFirst: string;
  userLast: string;
  userAge: Date;
  userGender: string;
  userLocation: string;
  userBio: string;
  userInterests: string;
  friendsLoaded = false;
  suggestionsLoaded = false;
  profile = {
    id: '',
    firstName: '',
    lastName: '',
    age: '',
    location: '',
    bio: '',
    picture: '',
    friends: [],
    hobbies:'',
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
    public router: Router,
    public app: AppComponent) {}

  ngOnInit() {
    this.app.setTitle("Edit Profile");
    this.fbAuth.authState.subscribe(data => {
      if (data == null) {
        this.router.navigateByUrl("/login");
      }
      else {
        this.getProfileInfo(data.uid);
        console.log('USER ID: ' + data.uid);
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
      this.profile.age = user.age;
      this.profile.location = user.location;
      this.profile.bio = user.bio;
      this.profile.gender = user.gender;
      this.profile.major = user.major;
      this.profile.picture = user.picture;
      this.profile.hobbies = user.hobbies;
    }));
  }

  updateUser(first, last, state, gender, interests, bio) {
    if (first != "" && last != "" && state != "" && gender != "" && state != "" && interests != "" && bio != "") {
        this.userFirst = first; 
        this.userLast = last;
        this.userGender = gender;
        this.userLocation = state;
        this.userInterests = interests;
        this.userBio = bio;
        console.log(gender);

        console.log(this.fbAuth.authState.subscribe(data => {
          this.db.collection('users').doc(data.uid).update({
              first: this.userFirst,
              last: this.userLast,
              location: this.userLocation,
              gender: this.userGender,
              bio: this.userBio,
              hobbies: this.userInterests,
              picture: 'https://firebasestorage.googleapis.com/v0/b/hobbyhub390.appspot.com/o/sample_pictures%2Fdefault_picture.png?alt=media&token=6dfc7fc7-7a5f-41dc-be90-94137adb0ef7',
          }).then(() => {
              this.router.navigateByUrl('/profile');
          });
        }));
      }      
    }
}