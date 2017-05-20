import { Component, Input } from "@angular/core";
import { Mana } from "../model/mana";

@Component({
    selector: "mana",
    template: require("./mana.component.html"),
    styles: [require("./mana.component.scss")]
})

export class ManaComponent {
    //@Input() colorType: string = undefined;

    @Input() mana: Mana;

    private manaPool: number = 0;
    public manaLeft : number = 0;

    constructor() { }

    getManaSymbol() : string {
        let manaImg:string = undefined;

        switch(this.mana.getColor()) {
            case "RED":
                manaImg = "Mana_R.png";
                break;
            case "BLUE":
                manaImg = "Mana_U.png";
                break;
            case "GREEN":
                manaImg = "Mana_G.png";
                break;
            case "WHITE":
                manaImg = "Mana_W.png";
                break;
            case "BLACK":
                manaImg = "Mana_B.png";
                break;
            case "MULTICOLOR":
                manaImg = "Mana_Rainbow.png";
                break;
            default:
                manaImg = "Mana_Colorless.png";
                break;
        }

        return "/public/images/mana-color/" + manaImg;
    }

    getManaTotal() : number {
        return this.mana.getManaTotal();
    }

    addMana() : void {
        let mana = new Mana("R");
        mana.addManaTotal();

        // this.store.dispatch(new manaAction.AddAction(mana));

        this.mana.addManaTotal();
        this.manaPool ++;
        this.manaLeft ++;
    }

    unspendAllMana() : void {
        this.manaLeft = this.manaPool;
    }

    spendMana() : void {
        if (this.manaLeft > 0) {
            this.manaLeft --;
        }
    }

    unspendMana() : void {
        if (this.manaLeft < this.manaPool) {
            this.manaLeft ++;
        }
    }

    endPhase() : void {
        this.manaPool = this.manaLeft;
    }

    endTurn() : void {
        this.manaPool = this.getManaTotal();
        this.manaLeft = this.getManaTotal();
    }
}