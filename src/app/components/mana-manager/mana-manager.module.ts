import { NgModule } from "@angular/core";

import { BrowserModule } from "@angular/platform-browser";
import { ManaComponent } from "../mana/mana.component";
import { ManaManagerComponent } from "./mana-manager.component";

import {LOG_LOGGER_PROVIDERS} from "angular2-logger/core";
import {MainPagesRoutingModule} from "../main-pages/main-pages-routing.module";
import {HomeComponent} from "../main-pages/home.component";
import {ContactComponent} from "src/app/components/main-pages/contact.component";
import {AboutComponent} from "../main-pages/about.component";

@NgModule({
	imports: [],
	declarations: [
        ManaManagerComponent,
        ManaComponent
	],
	bootstrap: [],
	providers: [LOG_LOGGER_PROVIDERS]
})

export class ManaManagerModule { }