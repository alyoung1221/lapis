import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search: string;
  users = [];

  constructor(private db: AngularFirestore, private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.search = params['s'].trim().toLowerCase();
    });
    this.searchUsers();      
  }

  toString(array, type) {
    var arrayString = "";

    if (type == "input") {
      array.each(function() {
        arrayString += $(this).val() + " ";
      });
    }
    else {
      array.forEach(function() {
        arrayString += this;
      })
    }

    return arrayString;
  }
  
  searchUsers() {
    this.users = [];
    this.db.collection("users").get().toPromise().then(snapshot => {
      snapshot.forEach(doc => {
        var name = doc.data().first + " " + doc.data().last;
        var hobbies = typeof(doc.data().hobbies) == "object" ? this.toString(doc.data().hobbies, "array") : doc.data().hobbies;
        
        if (hobbies.toLowerCase().includes(this.search) || name.toLowerCase().includes(this.search)) {
          this.users.push(doc.data());
        }
      });
    });
  }

  advancedSearch() {
    this.users = [];
    var statesMatch = false;
    this.db.collection("users").get().toPromise().then(snapshot => {
      snapshot.forEach(doc => {
        var age = this.formatAge(doc.data().age);
        if (this.toString($("#states option:selected"), "input").includes(doc.data().location) && doc.data().location != "") {
          statesMatch = true;
        }
        else {
          statesMatch = false;
        }
        if (typeof(doc.data().hobbies) == "string" && doc.data().hobbies.toLowerCase().includes(this.search) && (age >= $("#min").val() && age <= $("#max").val()) && statesMatch) {
          this.users.push(doc.data());
        }
      });
    });
  }

  formatAge(date) {
    var today = new Date();
    var birthDate = new Date(date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }
}