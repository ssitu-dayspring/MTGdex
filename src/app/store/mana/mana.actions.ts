import { Action } from "@ngrx/store";
import { type } from "../util";

export const ACTION = {
    ADD:    type("Add Mana"),
    REMOVE: type("Remove Mana")
};

export class AddAction implements Action {
    type = ACTION.ADD;
}

export class RemoveAction implements Action {
    type = ACTION.REMOVE;
}

export type Actions = 
    AddAction |
    RemoveAction;