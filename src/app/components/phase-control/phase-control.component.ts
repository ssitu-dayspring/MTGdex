import { Component } from "@angular/core";

@Component({
    selector: "phase-control",
    template: require("./phase-control.component.html"),
    styles: [require("./phase-control.component.scss")]
})

export class PhaseControlComponent {
    phases: any = [
        "Beginning Phase",
        "Pre-Combat Phase",
        "Combat Phase",
        "Post-Combat Phase",
        "End Phase"
    ];

    phaseSelected: number = 0;
    turn: number = 1;

    constructor() { }

    getPhase(phase: number) : string {
        return (phase + 1) + ". " + this.phases[phase];
    }

    changePhase(phase: number) : void {
        this.phaseSelected = phase ;
    }

    endTurn() : void {
        this.phaseSelected = 0;
    }

    nextTurn() : void {
        this.turn ++;
    }
}