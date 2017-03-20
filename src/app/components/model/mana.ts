export class Mana {
    private colors: any = {
		"R": "RED",
        "G": "GREEN",
        "U": "BLUE",
        "W": "WHITE",
        "B": "BLACK",
        "C": "COLORLESS",
        "M": "MULTICOLOR"
	};

    private color: string = undefined;
    private manaTotal: number = 0;
    // private manaLeft: number = 0;
    // private manaUsed: number = 0;

    constructor(colorType: string) {
        this.color = this.colors[colorType];
    }

    getColor() : string {
        return this.color;
    }

    // endPhase() : void {
    //     this.manaLeft = this.getManaLeft();
    //     this.manaUsed = 0;
    // }
    //
    // endTurn() : void {
    //     this.manaLeft = this.manaTotal;
    //     this.manaUsed = 0;
    // }
    //
    // getColor() : string {
    //     return this.color;
    // }

    getManaTotal() : number {
        return this.manaTotal;
    }

    // getManaLeft() : number {
    //     return this.manaTotal - this.manaUsed;
    // }
    //
    // getManaUsed() : number {
    //     return this.manaUsed;
    // }

    addManaTotal() : void {
        this.manaTotal ++;
    }

    decManaTotal() : void {
        this.manaTotal --;
    }

    // spendMana() : void {
    //     this.manaUsed ++;
    // }
}