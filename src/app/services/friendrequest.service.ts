import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class FriendrequestService {

  constructor(private db: AngularFirestore) { }

  getSentFriendRequests(userId) {
    console.log('getting sent friend requests');
  }

  getReceivedFriendRequests(userId) {
    console.log('getting received friend requests');
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
