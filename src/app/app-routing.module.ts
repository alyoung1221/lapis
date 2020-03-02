import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { SampleComponent } from './sample/sample.component';
import { FriendsComponent } from './components/friends/friends.component';
import { AboutComponent}  from './components/about/about.component';

const routes: Routes = [
  { path: '', component: SampleComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: SampleComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'friends', component: FriendsComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
