import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { FriendsService } from '../../services/friends.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['../../../template.css', './friends.component.css']
})
export class FriendsComponent implements OnInit {
  friends: Array<object>;
  constructor(private db: AngularFirestore, private data: FriendsService) { }
  
  ngOnInit() {
    ProfileComponent.friends.getInformation();
  }
  
  
}


