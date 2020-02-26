import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SampleComponent } from './components/sample/sample.component';
import { FriendsComponent } from './components/friends/friends.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { SuggestionsComponent } from './components/suggestions/suggestions.component';


const routes: Routes = [
  { path: '', component: SampleComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'friends', component: FriendsComponent },
  { path: 'suggestions', component: SuggestionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
