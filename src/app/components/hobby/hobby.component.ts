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
    this.urlParam = this.route.snapshot.params.hobby;
    this.getUserList(this.urlParam);
  }
  getUserList(urlParam) {
    this.hobbies.getHobbies(urlParam).subscribe((data) => {
      // data.data().users.map((user) => {

      // });
    });
  }

}
