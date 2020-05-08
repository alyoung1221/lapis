import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from '../../app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Identifiers } from '@angular/compiler';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private db: AngularFirestore, public fbAuth: AngularFireAuth, public app: AppComponent) { }
  profileParameter: string;
  profileFound: boolean;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  location: string;
  picture: string;
  bio: string;
  hobbies: Array<string>;
  friendStatus: string;
  profile = {
    hobbies: []
  };

  ngOnInit() {
    this.profileParameter = this.route.snapshot.paramMap.get('id');
    this.getProfileInfo(this.profileParameter);

    this.fbAuth.authState.subscribe(data => {
      if (this.profileParameter == data.uid) {
        this.router.navigateByUrl("/profile");
      } 
      this.getUserInfo(data.uid);
    });
  }
  getUserInfo(id) {
    const document = this.db.collection('users').doc(id);
    document.get().subscribe((userData => {
      const user = userData.data();
      this.profile.hobbies = user.hobbies == undefined ? user.hobbies : user.hobbies.split(", ").sort();
    }));
  }

  getProfileInfo(id) {
    const document = this.db.collection('users').doc(id);
    console.log(document);
    document.get().subscribe((userData => {
      const user = userData.data();
      if (user.first) {
        this.profileFound = true;
        this.firstName = user.first;
        this.lastName = user.last;
        this.gender = user.gender;
        this.age = Date.parse(user.age) ? this.getAge(user.age) : user.age;
        this.location = user.location;
        this.picture = user.picture;
        this.bio = user.bio;
        this.hobbies = user.hobbies == undefined ? user.hobbies : user.hobbies.split(", ").sort();
        this.app.setTitle(this.firstName + " " + this.lastName);
      } else {
        this.profileFound = false;
      }
    }));
  }

  filterHobbies(type) {
    var profileHobbies = this.hobbies;
    var userHobbies = this.profile.hobbies;
    var hobbies = []; 

    for (var i = 0 ; i < Math.max(profileHobbies.length, userHobbies.length); i++) {
      if (type == "similar") {
        if (profileHobbies[i] == userHobbies[i]) {
          hobbies.push(userHobbies[i]);
        }
      }
      else {
        if (profileHobbies[i] != userHobbies[i]) {
          hobbies.push(profileHobbies[i]);
        }        
      }
    }
    console.log(hobbies);
    return hobbies;
}
  getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  @Input() hobby: any;
  goToHobby(hobby) {
    this.router.navigateByUrl('/hobby/' + hobby);
  }
}