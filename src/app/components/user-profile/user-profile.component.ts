import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Identifiers } from '@angular/compiler';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private db: AngularFirestore) { }
  profileParameter: string;
  profileFound: boolean;
  firstName: string;
  lastName: string;
  gender: string;
  picture: string;
  hobbies: Array<string>;
  friendStatus: string;

  ngOnInit() {
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
        this.picture = user.picture;
        this.hobbies = user.hobbies;
      } else {
        this.profileFound = false;
      }
    }));
  }

}
