import { Component, OnInit, Input } from '@angular/core';
import { User } from 'firebase';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.css'],
})

export class UsercardComponent {
  constructor(private router: Router) { }
  @Input() user: any;
  goToUser(id) {
    this.router.navigateByUrl('/profile/' + id);
  }
}
