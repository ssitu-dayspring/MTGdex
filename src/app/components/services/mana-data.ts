export class ManaDataService {
    loadData(): any {
        return {
            manaRed: this.getEmptyMana('R'),
            manaGreen: this.getEmptyMana('G'),
            manaBlue: this.getEmptyMana('U'),
            manaWhite: this.getEmptyMana('W'),
            manaBlack: this.getEmptyMana('B'),
            manaColorless: this.getEmptyMana('C'),
            manaMulti: this.getEmptyMana('M')
        };
    }

    private getEmptyMana(manaType: string): any {
        return {
            manaType: manaType,
            manaTotal: 0,
            manaLeft: 0
        }
    }
}