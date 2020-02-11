import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: 'about', component: AppComponent},
  { path: 'contact', component: AppComponent},
  { path: 'profile', component: AppComponent},
  { path: 'home', component: AppComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
