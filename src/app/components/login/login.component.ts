import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginSuccess: boolean;
  constructor(public fb: AngularFireAuth, private router: Router, public app: AppComponent) { }

  ngOnInit() {
    this.app.setTitle("Login");
    this.fb.authState.subscribe(data => {
      if (data) {
        this.router.navigateByUrl("/profile");
      }
    });
    this.loginForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
    });
  }

doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(
        (() => {
          return firebase.auth().signInWithEmailAndPassword(value.email, value.password)
          .then(res => {
            this.loginSuccess = true;
            this.router.navigateByUrl('/profile');
            resolve(res);
          }, err => {
            this.loginSuccess = false;
            reject(err);
          });
        })
      );
    });
  }


}
