import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedin: boolean;
  constructor(public fbAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    // checks if the user is logged in and returns the status to the navbar to display different links depending on the state.
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user + ' logged in');
        this.loggedin = true;
      } else {
        console.log('no one logged in');
        this.loggedin = false;
      }
    });
  }

  signOutUser() {
    console.log('clicked');
    firebase.auth().signOut().then(() => {
      this.router.navigateByUrl('/');
    }).catch((error) => {
      window.alert(error);
    });
  }

}
