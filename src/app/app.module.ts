import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LOG_LOGGER_PROVIDERS } from 'angular2-logger/core';
import { Store, StoreModule } from '@ngrx/store';

import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { MainPagesModule } from './main-pages/main-pages.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar.component';

import { reducer } from './reducers';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainPagesModule,
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  declarations: [
    AppComponent,
    NavBarComponent
  ],
  bootstrap: [AppComponent],
  providers: [LOG_LOGGER_PROVIDERS]
})
export class AppModule { }
