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

  constructor(
    public fbAuth: AngularFireAuth, // Inject Firebase auth service
    public db: AngularFirestore,
  ) { }

  ngOnInit() {
  }

  signUp(email, password) {
    return this.fbAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.registered = true;
        console.log(result.user);
        this.userEmail = email;
        this.createUserEntry();
      }).catch((error) => {
        this.registered = false;
        console.log(error.message);
      });
  }

  createUserEntry() {
    console.log(this.fbAuth.authState.subscribe(data => {
      this.db.collection('users').doc(data.uid).set({
        first: '',
        last: '',
        email: this.userEmail,
        age: '',
        picture: '',
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
