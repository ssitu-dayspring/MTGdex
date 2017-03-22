import {Mana} from "../../components/model/mana";
import * as manaActions from "./mana.actions";

export interface State {
    manaCollection: {};
}

const initialState : State = {
    manaCollection: {
        "RED":        new Mana("R"),
        "GREEN":      new Mana("G"),
        "BLUE":       new Mana("U"),
        "WHITE":      new Mana("W"),
        "BLACK":      new Mana("B"),
        "COLORLESS":  new Mana("C"),
        "MULTICOLOR": new Mana("M")
    }
};


export function reducer(state = initialState, action: manaActions.Actions) : State {
    switch(action.type) {
        case manaActions.ACTION.ADD:
            return;
        case manaActions.ACTION.REMOVE:
            return;
        default:
            return state;
    }
}

function addMana(state: State, payload: any) {
    let color = payload.color;
    let mana = state[]
}