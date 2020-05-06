import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { ActivatedRoute } from '@angular/router';
import { Identifiers } from '@angular/compiler';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private db: AngularFirestore, public app: AppComponent) { }
  profileParameter: string;
  profileFound: boolean;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  location: string;
  picture: string;
  hobbies: Array<string>;
  friendStatus: string;

  ngOnInit() {
    this.app.setTitle("Profile");
    this.profileParameter = this.route.snapshot.paramMap.get('id');
    this.getProfileInfo(this.profileParameter);
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
        this.hobbies = user.hobbies == undefined ? user.hobbies : user.hobbies.split(",");
      } else {
        this.profileFound = false;
      }
    }));
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
}