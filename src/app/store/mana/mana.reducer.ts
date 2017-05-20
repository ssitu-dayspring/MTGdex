import {Mana} from "../../components/model/mana";
import * as manaActions from "./mana.actions";
import {Action} from "rxjs/Scheduler";
import {ManaPool} from "../../components/model/mana-pool";

export interface State {
    manaRed: Mana;
    manaGreen: Mana;
    manaBlue: Mana;
    manaWhite: Mana;
    manaBlack: Mana;
    manaColorless: Mana;
    manaMulti: Mana;
}

const initialState : State = {
    manaRed: undefined,
    manaGreen: undefined,
    manaBlue: undefined,
    manaWhite: undefined,
    manaBlack: undefined,
    manaColorless: undefined,
    manaMulti: undefined

};


export function reducer(state = initialState, action: manaActions.Actions) : State {
    switch(action.type) {
        case manaActions.ACTION.UPDATE_MANA_POOL:
            return updateManaPool((<manaActions.UpdateManaPoolAction>action).payload);
        case manaActions.ACTION.REFRESH_MANA_POOL:
            return state;
        case manaActions.ACTION.ADD:
            return;
        case manaActions.ACTION.REMOVE:
            return;
        default:
            return state;
    }
}

function updateManaPool(mp: ManaPool): State {
    return {
        manaRed: mp.manaRed,
        manaGreen: mp.manaGreen,
        manaBlue: mp.manaBlue,
        manaWhite: mp.manaWhite,
        manaBlack: mp.manaBlack,
        manaColorless: mp.manaColorless,
        manaMulti: mp.manaMulti
    };
}

export const getManaPool = (state: State) => state;