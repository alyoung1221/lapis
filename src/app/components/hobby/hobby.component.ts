import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HobbiesService } from '../../services/hobbies.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-hobby',
  templateUrl: './hobby.component.html',
  styleUrls: ['./hobby.component.css']
})
export class HobbyComponent implements OnInit {

  urlParam = '';
  userList = [];
  constructor(
    private route: ActivatedRoute,
    private hobbies: HobbiesService,
    public app: AppComponent
    ) {}

  ngOnInit() {
    this.urlParam = this.route.snapshot.params.hobby;
    this.app.setTitle(this.urlParam);
    this.getUserList(this.urlParam.toLowerCase());
  }
  getUserList(urlParam) {
    this.userList = this.hobbies.getHobbies(urlParam);
  }
}