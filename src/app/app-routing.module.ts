import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { SampleComponent } from './sample/sample.component';


const routes: Routes = [
  { path: 'about', component: SampleComponent},
  { path: 'contact', component: SampleComponent},
  { path: 'profile', component: ProfileComponent},
  { path: '', component: SampleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
