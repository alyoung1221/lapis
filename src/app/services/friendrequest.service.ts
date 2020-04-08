import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FriendsService } from './friends.service';

@Injectable({
  providedIn: 'root'
})

export class FriendrequestService {

  constructor(
    private db: AngularFirestore,
    private friendServ: FriendsService,
    ) { }

  getSentFriendRequests(id) {
    const friends = [];
    // algorithm to get sent friend requests from the database depending on the userID.
    const friendQuery = this.db.collection('friends').doc(id);
    friendQuery.get().subscribe((friendData) => {
      const friend = friendData.data().sent;
      friend.map((uid) => {
        friends.push(this.friendServ.getIndividualAccount(uid));
      });
    });
    return friends;
  }

  getReceivedFriendRequests(id) {
    const friends = [];
    // algorithm to get received friend requests from the database depending on the userID.
    const friendQuery = this.db.collection('friends').doc(id);
    friendQuery.get().subscribe((friendData) => {
      const friend = friendData.data().received;
      friend.map((uid) => {
        this.db.collection('users').doc(uid).get().subscribe((data) => {
          friends.push(data.data());
        });
      });
    });
    return friends;
  }

  sendFriendRequest(userId, targetId) {
    console.log('send friend request');
  }

  confirmFriendRequest(userId, targetId) {
    console.log('confirming friend request');
  }

  denyFriendRequest(userId, targetId) {
    console.log('denying friend request');
  }
}
