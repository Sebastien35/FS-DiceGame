export class Dice {
    sides : number;
    constructor() {
        this.sides = 6;
    }

    roll(): number {
        return Math.floor(Math.random() * this.sides) + 1;
        
    }

    getSide(): number {
        return this.sides;
    }

    setSide(): number {
        return this.sides;
    }
}