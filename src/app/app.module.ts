import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LOG_LOGGER_PROVIDERS } from 'angular2-logger/core';
import { Store, StoreModule } from '@ngrx/store';

import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { MainPagesModule } from './components/main-pages/main-pages.module';

import { AppComponent } from './components/app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

import { reducer } from './store';
import { ManaManagerComponent } from "./components/mana-manager/mana-manager.component";
import { ManaComponent } from "./components/mana/mana.component";
import { PhaseControlComponent } from "./components/phase-control/phase-control.component";
import { ManaManagerModule } from "./components/mana-manager/mana-manager.module";

@NgModule({
      imports: [
            BrowserModule,
            AppRoutingModule,
            // MainPagesModule,
            StoreModule.provideStore(reducer),
            RouterStoreModule.connectRouter(),
            StoreDevtoolsModule.instrumentOnlyWithExtension(),
            //ManaManagerModule
      ],
      declarations: [
            AppComponent,
            NavBarComponent,
            ManaManagerComponent,
            ManaComponent,
            PhaseControlComponent
      ],
      bootstrap: [AppComponent],
      providers: [LOG_LOGGER_PROVIDERS]
})
export class AppModule { }
