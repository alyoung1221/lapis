import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

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

  constructor(
    public fbAuth: AngularFireAuth, // Inject Firebase auth service
    public db: AngularFirestore,
  ) { }

  ngOnInit() {
  }

  signUp(email, password, userName, dob) {
    return this.fbAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.registered = true;
        console.log(result.user);
        this.userEmail = email;
        this.userFirst = userName;
        this.userAge = dob;
        this.createUserEntry();
      }).catch((error) => {
        this.registered = false;
        console.log(error.message);
      });
  }

  createUserEntry() {
    console.log(this.fbAuth.authState.subscribe(data => {
      this.db.collection('users').doc(data.uid).set({
        first: this.userFirst,
        last: '',
        email: this.userEmail,
        age: this.userAge,
        picture: 'https://firebasestorage.googleapis.com/v0/b/hobbyhub390.appspot.com/o/sample_pictures%2Fdefault_picture.png?alt=media&token=128f0b8b-8b24-42f5-8ebb-6c4959924dc8',
        location: '',
        gender: '',
        major: '',
        hobbies: [],
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
