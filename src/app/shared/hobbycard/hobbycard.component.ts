import { Component, OnInit, Input } from '@angular/core';
import { ProfileComponent } from 'src/app/profile/profile.component';

@Component({
  selector: 'app-hobbycard',
  templateUrl: './hobbycard.component.html',
  styleUrls: ['./hobbycard.component.css']
})
export class HobbycardComponent implements OnInit {
  @Input() hobby: ProfileComponent;
  constructor() { }

  ngOnInit() {
  }

}
