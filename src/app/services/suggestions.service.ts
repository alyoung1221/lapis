import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  constructor(private db: AngularFirestore) { }

  getSuggestions(userId) {
    const suggestions = [];
    const suggestionsQuery = this.db.collection('suggestions').doc(userId);
    suggestionsQuery.get().subscribe((suggestionData) => {
      const suggestion = suggestionData.data().suggestions;
      suggestion.map((uid) => {
        this.db.collection('users').doc(uid).get().subscribe((data) => {
          suggestions.push(data.data());
        });
      });
    });
    return suggestions;
  }
}
