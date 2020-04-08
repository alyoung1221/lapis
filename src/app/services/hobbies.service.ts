import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HobbiesService {

  constructor(private db: AngularFirestore) { }

  getHobbies(hobby) {
    // algorithm to get the friends from the database depending on the users confirmed friends.
    return this.db.collection('hobbies').doc(hobby).get();
  }
}
