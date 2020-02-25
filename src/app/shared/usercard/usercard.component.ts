import { Component, OnInit, Input } from '@angular/core';
import { User } from 'firebase';
import { ProfileComponent } from 'src/app/components/profile/profile.component';

@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.css']
})
export class UsercardComponent implements OnInit {
  @Input() user: ProfileComponent;
  constructor() { }

  ngOnInit() {
  }

}
