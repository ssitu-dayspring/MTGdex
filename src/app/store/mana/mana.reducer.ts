import {Mana} from "../../components/model/mana";
import * as manaActions from "./mana.actions";

export interface State {
    manaCollection: Mana[];
}

const initialState : State = {
    manaCollection: [
        new Mana("R"),
        new Mana("G"),
        new Mana("U"),
        new Mana("W"),
        new Mana("B"),
        new Mana("C"),
        new Mana("M")
    ]
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

function addMana(state: State, newManaState: Mana) {
    let newManaCollection = state.manaCollection.map(
        (mana: Mana) => {
            let colorType = newManaState.getColor();
            if (mana.getColor() === colorType) {
                let updatedMana = newManaState;
            } else {
                return mana;
            }
        }
    );

    let newState = {
        manaCollection: newManaCollection
    };

    return newState;
}