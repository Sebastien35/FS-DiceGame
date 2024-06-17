export class Player {
    public name: string;
    public score: number;

    constructor(name: string) {
        this.name = name;
        this.score = 0;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }


    getScore(): number {
        return this.score;
    }

    setScore(): number {
        return this.score;
    }

    setNewScore(score: number): void {
        this.score = score;
    }
}