import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, skipWhile, withLatestFrom } from 'rxjs/operators';

import { SETTINGS, ERRORMESSAGES } from './searchbox.config';

@Component({
  selector: 'lib-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent implements OnDestroy {

  // Inputs and their default values

  @Input() hideSearchButton: boolean | '' = SETTINGS.hideSearchButton; // '' allows short syntax, eg: <lib-searchbox hideSearchButton>
  @Input() placeholder = SETTINGS.placeholder;
  @Input() buttonLabel = SETTINGS.buttonLabel;

  @Input() requiredError = ERRORMESSAGES.required;
  @Input() tooShortError = ERRORMESSAGES.minLength;
  @Input() tooLongongError = ERRORMESSAGES.maxLength;
  @Input() patternError = ERRORMESSAGES.pattern;

  // Emits search string. Will emit `null` if the latest state is invalid
  @Output() search = new EventEmitter<string>();

  // Make configuration available for the view template
  SETTINGS = SETTINGS;
  ERRORMESSAGES = ERRORMESSAGES;

  searchControl = new FormControl('', [
    Validators.required,
    Validators.minLength(SETTINGS.minLength),
    Validators.maxLength(SETTINGS.maxLength),
    Validators.pattern(SETTINGS.pattern),
  ]);

  private emitSubscription = this.searchControl.valueChanges.pipe(
    withLatestFrom(of(this.searchControl)), // Asyncronously bundle control to let stream determine validity of input
    skipWhile(([ , control]) => control.invalid), // No need to emit null for initial invalid values
    map(([searchString, control]) => control.valid ? searchString : null), // Emit null to let consumer know about invalid state
    debounceTime(SETTINGS.debounceTime),
    distinctUntilChanged(),
  ).subscribe(searchString => this.search.emit(searchString));

  ngOnDestroy(): void {
    this.emitSubscription.unsubscribe();
  }

}
