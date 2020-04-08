import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor( private http: HttpClient) { }
  getRandomFriends() {
    return this.http.get('https://uinames.com/api/');
  }
}
