const colors: any = {
    "R": "RED",
    "G": "GREEN",
    "U": "BLUE",
    "W": "WHITE",
    "B": "BLACK",
    "C": "COLORLESS",
    "M": "MULTICOLOR"
};

export class Mana {
    private color: string = undefined;
    private manaTotal: number = 0;

    constructor(colorType: string) {
        this.color = colors[colorType];
    }

    getColor() : string {
        return this.color;
    }

    getManaTotal() : number {
        return this.manaTotal;
    }

    addManaTotal() : void {
        this.manaTotal ++;
    }

    decManaTotal() : void {
        this.manaTotal --;
    }
}