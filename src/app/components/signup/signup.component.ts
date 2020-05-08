import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registered: boolean;
  userEmail: string;
  userFirst: string;
  userLast: string;
  userAge: Date;
  userGender: string;
  userLocation: string;
  userInterests: string;

  constructor(
    public fbAuth: AngularFireAuth, // Inject Firebase auth service.
    public db: AngularFirestore, // Inject our Firebase database to the app.
    public router: Router, // Injects Angular Router so we can navigate after.
  ) { }

  ngOnInit() {
  }

  signUp(email, password, first, last, dob, state, interests) {
    return this.fbAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.registered = true;
        console.log(result.user);
        this.userEmail = email;
        this.userFirst = first;
        this.userLast = last;
        this.userAge = dob;
        this.userLocation = state;
        this.userInterests = interests;
        this.createUserEntry();
        this.router.navigateByUrl('/profile');
      }).catch((error) => {
        this.registered = false;
        console.log(error.message);
      });
  }

  createUserEntry() {
    console.log(this.fbAuth.authState.subscribe(data => {
      this.db.collection('users').doc(data.uid).set({
        first: this.userFirst,
        last: this.userLast,
        email: this.userEmail,
        age: this.userAge,
        picture: 'https://firebasestorage.googleapis.com/v0/b/hobbyhub390.appspot.com/o/sample_pictures%2Fdefault_picture.png?alt=media&token=6dfc7fc7-7a5f-41dc-be90-94137adb0ef7',
        location: this.userLocation,
        gender: '',
        major: '',
        hobbies: this.userInterests,
        friends: [],
      });
      this.db.collection('friends').doc(data.uid).set({
        sent: [],
        received: [],
        confirmed: [],
      });
      this.db.collection('suggestions').doc(data.uid).set({
        suggestions: [],
      });
    }));
  }

}
