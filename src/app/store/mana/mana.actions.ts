import { Action } from "@ngrx/store";
import { type } from "../util";
import { Mana } from "../../components/model/Mana";
import {ManaPool} from "../../components/model/mana-pool";

export const ACTION = {
    SETUP_MANA_POOL: type('[Mana] Setup Mana Pool'),
    UPDATE_MANA_POOL: type('[Mana] Update Mana Pool'),
    REFRESH_MANA_POOL: type('[Mana] Load All Mana'),
    ADD:    type('[Mana] Add Mana'),
    REMOVE: type('[Mana] Remove Mana')
};

export class SetupManaPoolAction implements Action {
    type = ACTION.SETUP_MANA_POOL;

    constructor(public payload: string) {}
}

export class UpdateManaPoolAction implements Action {
    type = ACTION.UPDATE_MANA_POOL;
    payload: ManaPool;

    constructor(
        manaRed: Mana,
        manaGreen: Mana,
        manaBlue: Mana,
        manaWhite: Mana,
        manaBlack: Mana,
        manaColorless: Mana,
        manaMulti: Mana
    ) {
        this.payload = {
            manaRed: manaRed,
            manaGreen: manaGreen,
            manaBlue: manaBlue,
            manaWhite: manaWhite,
            manaBlack: manaBlack,
            manaColorless: manaColorless,
            manaMulti: manaMulti,
        }
    }
}

export class RefreshManaPoolAction implements Action {
    type = ACTION.REFRESH_MANA_POOL;

    constructor() {}
}

export class AddAction implements Action {
    type = ACTION.ADD;

    constructor(public payload: Mana) {}
}

export class RemoveAction implements Action {
    type = ACTION.REMOVE;

    constructor(public payload: Mana) {}
}

export type Actions =
    SetupManaPoolAction |
    UpdateManaPoolAction |
    RefreshManaPoolAction |
    AddAction |
    RemoveAction;