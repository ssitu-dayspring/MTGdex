import {Component, Input} from "@angular/core";
import { Mana } from "../model/mana";

@Component({
    selector: "mana",
    template: require("./mana.component.html"),
    styles: [require("./mana.component.scss")]
})

export class ManaComponent {
    @Input() colorType: string = undefined;

    private mana: Mana = null;
    private manaPool: number = 0;

    public manaLeft : number = 0;

    constructor() { }
	
	ngOnInit() {
        this.mana = new Mana(this.colorType);
	}

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
        this.mana.addManaTotal();
        this.manaPool ++;
        this.manaLeft ++;
    }

    spendMana() : void {
        if (this.manaLeft > 0) {
            this.manaLeft --;
        }
    }

    endPhase() : void {
        this.manaPool = this.manaLeft;
    }

    endTurn() : void {
        this.manaPool = this.getManaTotal();
        this.manaLeft = this.getManaTotal();
    }

    undo() : void {
        this.manaLeft = this.manaPool;
    }
}