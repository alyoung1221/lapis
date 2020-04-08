import { Component, OnInit, Input } from '@angular/core';
import { User } from 'firebase';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.css'],
})
export class UsercardComponent {
  @Input() user: any;
}
