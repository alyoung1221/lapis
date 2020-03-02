import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Importing all of the Firestore Modules required to get data from our database.
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Importing all of the custom-made components we have developed.
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SampleComponent } from './components/sample/sample.component';
import { UsercardComponent } from './shared/usercard/usercard.component';
import { FriendsComponent } from './components/friends/friends.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';

const config = {
    apiKey: 'AIzaSyBzxJlV7YQTlKixOuWrifWUaC2mwbCdMM8',
    authDomain: 'hobbyhub390.firebaseapp.com',
    databaseURL: 'https://hobbyhub390.firebaseio.com',
    projectId: 'hobbyhub390',
    storageBucket: 'hobbyhub390.appspot.com',
    messagingSenderId: '1011053507527',
    appId: '1:1011053507527:web:6ee10a6f54c15dc1079fe2',
    measurementId: 'G-ETHMJ9DL5S'
};

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    ContactComponent,
    NavbarComponent,
    NotFoundComponent,
    ProfileComponent,
    FriendsComponent,
    SampleComponent,
    UsercardComponent,
    SignupComponent,
    LoginComponent,
    FooterComponent,
    SearchComponent,
    AdvancedSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
