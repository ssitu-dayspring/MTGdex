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
  template: require('./nav-bar.component.html'),
  styles: [require('./nav-bar.component.scss')]
})
export class NavBarComponent {
  @Input() readOnly: boolean = false;
  pageState$: Observable<fromMainPage.State>;

  private path: string;
  private urlDefinitions = [
    { key: 'home', url: '/home' },
    { key: 'about', url: '/about' },
    { key: 'contact', url: '/contact' },
  ]
  private urls: any;
  private active: any;

  constructor(private store: Store<fromRoot.State>, private $log: Logger) {
    this.pageState$ = store.select(fromRoot.getMainPageState);

    this.urls = {};
    this.active = {};
    this.urlDefinitions.forEach(value => {
      this.urls[value.key] = value.url;
      this.active[value.key] = false;
    });

    store.select(fromRoot.getRouterPath).subscribe((path) => {
      console.log(path);
      this.path = path;
      this.urlDefinitions.forEach(value => {
        this.active[value.key] = (path === value.url);
      });
    });

    this.pageState$.subscribe((state) => {
      this.readOnly = (state.readOnly !== undefined) ? state.readOnly : this.readOnly;
    });
  }

  private go(urlName: string): void {
    this.store.dispatch(go([this.urls[urlName]]));
  }
}
