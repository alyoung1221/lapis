import { Component, OnInit, ComponentFactoryResolver, ViewEncapsulation } from '@angular/core';
import { AppComponent } from '../../app.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  userFirst: string;
  userLast: string;
  userAge: Date;
  userGender: string;
  userLocation: string;
  userBio: string;
  userInterests: string;
  friendsLoaded = false;
  suggestionsLoaded = false;
  profile = {
    id: '',
    firstName: '',
    lastName: '',
    age: '',
    location: '',
    bio: '',
    picture: '',
    friends: [],
    hobbies: '',
    suggestions: [],
    major: '',
    gender: ''
  };
  interests = [];

  constructor(
    private db: AngularFirestore,
    public fbAuth: AngularFireAuth,
    public router: Router,
    public app: AppComponent) {}

  ngOnInit() {
    this.app.setTitle("Edit Profile");
    this.fbAuth.authState.subscribe(data => {
      if (data == null) {
        this.router.navigateByUrl("/login");
      }
      else {
        this.getProfileInfo(data.uid);
        console.log('USER ID: ' + data.uid);
      }
    });
  }  

  getProfileInfo(id) {
    const document = this.db.collection('users').doc(id);
    document.get().subscribe((userData => {
      const user = userData.data();
      this.profile.id = id;
      this.profile.firstName = user.first;
      this.profile.lastName = user.last;
      this.profile.age = user.age;
      this.profile.location = user.location;
      this.profile.bio = user.bio;
      this.profile.gender = user.gender;
      this.profile.major = user.major;
      this.profile.picture = user.picture;
      this.profile.hobbies = user.hobbies;
      if (this.profile.location != "") {
        $('#state').dropdown('set selected', this.profile.location);
      }
      this.loadInterests(this.profile.hobbies.split(", ").length);
    }));
  }

  updateUser(first, last, state, gender, interests, bio) {
    if (first != "" && last != "" && state != "" && gender != "" && state != "" && interests != "" && bio != "") {
      this.userFirst = first; 
      this.userLast = last;
      this.userGender = gender;
      this.userLocation = state;
      this.userInterests = interests;
      this.userBio = bio;

      console.log(this.fbAuth.authState.subscribe(data => {
        this.db.collection('users').doc(data.uid).update({
          first: this.userFirst,
          last: this.userLast,
          location: this.userLocation,
          gender: this.userGender,
          bio: this.userBio,
          hobbies: this.userInterests,
          picture: 'https://firebasestorage.googleapis.com/v0/b/hobbyhub390.appspot.com/o/sample_pictures%2Fdefault_picture.png?alt=media&token=6dfc7fc7-7a5f-41dc-be90-94137adb0ef7',
        }).then(() => {
          this.router.navigateByUrl('/profile');
        });
      }));
    }      
  }

  loadInterests(i) {
    var hobbies = this.profile.hobbies.split(", ");
    var interests = this.getInterests();	
    var selected = "";
    var options = [];

    if (i == hobbies.length) {
      this.profile.hobbies.split(", ").forEach(function(interest) {
        selected += interest;
      });
    }
    else {
      $("[name='interests[]']").each(function() {
        selected += $(this).val();
      });
    }

    interests.forEach(function(interest) {
      if (!selected.includes(interest)) {
        options.push(interest);
      }
    });

		if ($("[name='interests[]']").length < interests.length && $("[name='interests[]']:checked").length < 10) {
      for (var x = 0; x < 6; x++) { 
        if (options[x] != undefined) {
          this.interests.push(options[x]);
        }
      }
    }
    else {
      this.validateCheckbox(i);
    }
  }

  addInterest(i) {
    if ($("[name='interests[]']").eq(this.profile.hobbies.split(", ").length + i).prop("checked")) {
      $("[name='interests[]']").eq(this.profile.hobbies.split(", ").length + i).next("label").addClass("checked");      
    }
    else {
      $("[name='interests[]']").eq(this.profile.hobbies.split(", ").length + i).next("label").removeClass("checked");      
    }

		var interests = $("[name='interests[]']:checked").map(function() { 
      return $(this).val(); 
    }).get().join(", ");
		$("[name='interests']").val(interests);
  }

  validateCheckbox(i) {
    var hobbies = this.profile.hobbies.split(", ");
    if ($("[name='interests[]']:checked").length > 10) {
      alert("Please select up to 10 interests");
      $("[name='interests[]']").eq(i + hobbies.length).prop("checked", false);
      $("[name='interests[]']").eq(i + hobbies.length).next().removeClass("checked");
    }
  }

  getInterests() {
		var interests = [];
		
		interests.push("Baking");
		interests.push("Cooking");
		interests.push("Reading");
		interests.push("Skiing");
		interests.push("Volleyball"); 
		interests.push("Zip Lining");
		interests.push("Music");
		interests.push("Art");
		interests.push("Sewing");
		interests.push("Writing");
		interests.push("Ice Skating");
		interests.push("Latte Art");
		interests.push("Swing Dancing");
		interests.push("Ballet");
		interests.push("Biking");
		interests.push("Singing");	
		interests.push("Herbology");
		interests.push("Skincare");
		interests.push("Food");
		interests.push("Fashion");
		interests.push("Games");
		interests.push("Movies");
		interests.push("Blogging");
		interests.push("Travel");	
		
		return interests;
  }
}