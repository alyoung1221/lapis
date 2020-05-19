import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HobbiesService } from '../../services/hobbies.service';

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
    private hobbies: HobbiesService
    ) {}

  ngOnInit() {
    this.urlParam = this.route.snapshot.params.hobby.toLowerCase();
    this.getUserList(this.urlParam);
  }
  getUserList(urlParam) {
    this.userList = this.hobbies.getHobbies(urlParam);
  }
}