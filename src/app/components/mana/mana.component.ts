import {Component, Input} from "@angular/core";
import { Mana } from "../model/mana";

@Component({
    selector: "mana",
    template: require("./mana.component.html")
})

export class ManaComponent {
    @Input() colorType: string = undefined;

    private mana: Mana = null;
    private manaLeft: number = 0;
    private manaUsed: number = 0;

    constructor() { }
	
	ngOnInit() {
        this.mana = new Mana(this.colorType);
	}

    getManaTotal() : number {
        return this.mana.getManaTotal();
    }

    getManaSymbol() : string {
        let png:string = undefined;

        switch(this.mana.getColor()) {
            case "RED":
                png = "Mana_R.png";
                break;
            case "BLUE":
                png = "Mana_U.png";
                break;
            case "GREEN":
                png = "Mana_G.png";
                break;
            case "WHITE":
                png = "Mana_W.png";
                break;
            case "BLACK":
                png = "Mana_B.png";
                break;
            case "MULTICOLOR":
                png = "Mana_Rainbow.png";
                break;
            default:
                png = "Mana_Colorless.png";
                break;
        }

        return "/public/images/mana-color/" + png;
    }
}