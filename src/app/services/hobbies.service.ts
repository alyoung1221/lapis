import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HobbiesService {

  constructor(private db: AngularFirestore) { }

  getHobbies(hobby) {
    // algorithm to get the friends from the database depending on the users confirmed friends.

    var users = [];
    this.db.collection("users").get().toPromise().then(snapshot => {
      snapshot.forEach(doc => {
        var hobbies = typeof(doc.data().hobbies) == "object" ? this.toString(doc.data().hobbies, "array") : doc.data().hobbies;
        
        if (hobbies.toLowerCase().includes(hobby)) {
          users.push(doc.data());
        }
      });
    });
    console.log(users);
    return users;
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
}