import { Component } from "@angular/core";

import { Observable } from 'rxjs/Observable';

import { Store } from "@ngrx/store";
import * as fromRoot from "../../store";
import * as manaAction from "../../store/mana/mana.actions";
import {Mana} from "../model/mana";

@Component ({
    selector: "mana-manager",
    template: require("./mana-manager.component.html"),
    styles: [require("./mana-manager.component.scss")]
})

export class ManaManagerComponent {
    public manaPool$: Observable<Mana[]>;

    constructor(private store: Store<fromRoot.State>) {
        this.manaPool$ = this.store.select(fromRoot.getManaPool);
    }
}