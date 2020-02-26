import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../suggestion';
import { SUGGESTIONS } from '../mock-suggestion';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})

export class SuggestionsComponent implements OnInit {

  suggestions = SUGGESTIONS;
  selectedSuggestion: Suggestion;

  constructor() { }

  ngOnInit() {
  }

  onSelect(suggestion: Suggestion): void {
    this.selectedSuggestion = suggestion;
  }
}