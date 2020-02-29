import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { SampleComponent } from './sample/sample.component';
import { FriendsComponent } from './components/friends/friends.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';

const routes: Routes = [
  { path: '', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'about', component: SampleComponent},
  { path: 'contact', component: SampleComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'friends', component: FriendsComponent },
  { path: 'advanced-search', component: AdvancedSearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
