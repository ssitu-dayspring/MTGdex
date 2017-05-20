import {Mana} from "./mana";

export interface ManaPool {
    manaRed: Mana,
    manaGreen: Mana,
    manaBlue: Mana,
    manaWhite: Mana,
    manaBlack: Mana,
    manaColorless: Mana,
    manaMulti: Mana,
}