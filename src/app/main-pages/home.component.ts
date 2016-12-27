import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import * as fromMainPage from '../reducers/main-page';
import * as page from '../actions/main-page';

@Component({
  selector: 'home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: require('./home.component.html'),
  styles: [require('./home.component.scss')]
})
export class HomeComponent {
  @Input() readOnly: boolean = false;
  pageState$: Observable<fromMainPage.State>;

  constructor(private store: Store<fromRoot.State>, private $log: Logger) {
    this.pageState$ = store.select(fromRoot.getMainPageState);

    this.pageState$.subscribe((state) => {
      this.readOnly = (state.readOnly !== undefined) ? state.readOnly : this.readOnly;
    });
  }

  addScores(value: string): boolean {
    this.$log.debug('Add Scores = "' + value + '"');
    return false;
  }
  resetScores(): boolean {
    this.$log.debug('Reset Scores');
    return false;
  }
}
