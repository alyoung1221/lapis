import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private db: AngularFirestore) { }

  getFriends(id) {
    const friends = [];
    // algorithm to get the friends from the database depending on the users confirmed friends.
    const friendQuery = this.db.collection('friends').doc(id);
    friendQuery.get().subscribe((friendData) => {
      const friend = friendData.data().confirmed;
      friend.map((uid) => {
        this.db.collection('users').doc(uid).get().subscribe((data) => {
          friends.push(data.data());
        });
      });
    });
    return friends;
  }

  getIndividualAccount(id) {
    return this.db.collection('users').doc(id);
  }

}
