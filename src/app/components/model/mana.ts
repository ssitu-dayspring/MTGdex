const colors: any = {
    "R": "RED",
    "G": "GREEN",
    "U": "BLUE",
    "W": "WHITE",
    "B": "BLACK",
    "C": "COLORLESS",
    "M": "MULTICOLOR"
};

export interface Mana {
    manaType: string;
    manaTotal: number;
    manaLeft: number;
}