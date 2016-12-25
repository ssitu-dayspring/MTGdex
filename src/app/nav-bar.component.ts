import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from './reducers';
import * as fromMainPage from './reducers/main-page';
import * as page from './actions/main-page';

@Component({
  selector: 'nav-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: require('./nav-bar.component.html')
})
export class NavBarComponent {
  @Input() readOnly: boolean = false;
  pageState$: Observable<fromMainPage.State>;
  private isHome: boolean;
  private isAbout: boolean;
  private isContact: boolean;

  constructor(private store: Store<fromRoot.State>, private $log: Logger) {
    this.pageState$ = store.select(fromRoot.getMainPageState);

    store.select(fromRoot.getRouterPath).subscribe((path) => {
      console.log(path);
      this.isHome = (path === '/home');
      this.isAbout = (path === '/about');
      this.isContact = (path === '/contact');
    });

    this.pageState$.subscribe((state) => {
      this.readOnly = (state.readOnly !== undefined) ? state.readOnly : this.readOnly;
    });
  }

  goHome(): void {
      this.store.dispatch(go(['/home']));
  }
  goAbout(): void {
      this.store.dispatch(go(['/about']));
  }
  goContact(): void {
      this.store.dispatch(go(['/contact']));
  }

  clickEdit(): void {
    this.store.dispatch(new page.EditPageAction());
  }
}
