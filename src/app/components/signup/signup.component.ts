import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AppComponent } from '../../app.component';

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
  userGender: string;
  userAge: Date;
  userBio: string;
  userHobbies: string;

  constructor(
    public fbAuth: AngularFireAuth, // Inject Firebase auth service.
    public db: AngularFirestore, // Inject our Firebase database to the app.
    public router: Router, // Injects Angular Router so we can navigate after.
    public app: AppComponent
  ) { }

  ngOnInit() {
    this.app.setTitle("Sign Up");
  }

  signUp(email, password, fname, lname, gender, dob, bio, hobbies) {
    if (email != "" && password != "" && fname != "" && lname != "" && gender != "" && dob != "") {
      return this.fbAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.registered = true;
        console.log(result.user);
        this.userEmail = email;
        this.userFirst = fname;
        this.userLast = lname;
		    this.userGender = gender;
        this.userAge = dob;
        this.userBio = bio;
        this.userHobbies = hobbies;
        this.createUserEntry();
        this.router.navigateByUrl('/profile');
      }).catch((error) => {
        this.registered = false;
        console.log(error.message);
      });
    }
  }

  createUserEntry() {
    console.log(this.fbAuth.authState.subscribe(data => {
      this.db.collection('users').doc(data.uid).set({
        id: data.uid,
        email: this.userEmail,
        first: this.userFirst,
        last: this.userLast,
        gender: this.userGender,
        age: this.userAge,
        picture: 'https://firebasestorage.googleapis.com/v0/b/hobbyhub390.appspot.com/o/sample_pictures%2Fdefault_picture.png?alt=media&token=6dfc7fc7-7a5f-41dc-be90-94137adb0ef7',
        location: '',
        major: '',
        bio: this.userBio,
        hobbies: this.userHobbies,
        friends: []
      });
      this.db.collection('friends').doc(data.uid).set({
        sent: [],
        received: [],
        confirmed: [],
      });
      this.db.collection('suggestions').doc(data.uid).set({
        suggestions: [],
      });
      this.updateSuggestions(data.uid, this.userHobbies);
    }));
  }

  updateSuggestions(id, userHobbies) {
    console.log(id);
    console.log(userHobbies);
    this.db.collection("users").get().toPromise().then(snapshot => {
      snapshot.forEach(doc => {
        var hobbies = typeof(doc.data().hobbies) == "object" ? doc.data() : doc.data().hobbies.split(", ");
        var found = false; 
        var i = 0; 

        while (!found && i < hobbies.length) {
          if (userHobbies.includes(hobbies[i]) && doc.data().id != id) {
            console.log(doc.data().id);
            console.log(hobbies[i]);
            this.db.collection('suggestions').doc(id).update({ 
              suggestions: firebase.firestore.FieldValue.arrayUnion(doc.data().id)
            }).then(() => {
              console.log("success");
            });
            found = true;
          }
          i++;
        } 
      });
    });
  }
}