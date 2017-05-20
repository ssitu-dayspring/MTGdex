import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { ManaDataService } from '../../components/services/mana-data';
import * as mana from './mana.actions';

@Injectable()
export class ManaEffects {
    @Effect({})
    load$: Observable<Action> = this.actions$
        .ofType(mana.ACTION.SETUP_MANA_POOL)
        .debounceTime(300)
        .switchMap(() => {
            const nextSearch$ = this.actions$.ofType(mana.ACTION.SETUP_MANA_POOL).skip(1);

            return this.manaData.loadData();
        });

    constructor(
        private actions$: Actions,
        private manaData: ManaDataService
    ) { }
}