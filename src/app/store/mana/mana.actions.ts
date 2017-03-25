import { Action } from "@ngrx/store";
import { type } from "../util";
import { Mana } from "../../components/model/Mana";

export const ACTION = {
    ADD:    type("Add Mana"),
    REMOVE: type("Remove Mana")
};

export class AddAction implements Action {
    type = ACTION.ADD;

    constructor(public payload: Mana) {}
}

export class RemoveAction implements Action {
    type = ACTION.REMOVE;

    constructor(public payload: Mana) {}
}

export type Actions = 
    AddAction |
    RemoveAction;