export class Score {

    
    public score : number;
    public player : string;
    public date : Date;
    public turns: number;
    public gameId: string;

    constructor(
        score: number, 
        player: string, 
        date: Date, 
        turns: number,
        gameId: string

    ) {
        this.score = score;
        this.player = player;
        this.date = date;
        this.turns = turns;
        this.gameId = gameId;
    }

    public getScore() : number {
        return this.score;
    }

    public setScore(score: number) : void {
        this.score = score;
    }

    public getplayer() : string {
        return this.player;
    }

    public setPlayer(player: string) : void {
        this.player = player;
    }

    public getDate() : Date {
        return this.date;
    }

    public setDate(date: Date) : void {
        this.date = date;
    }


    public getTurns() : number {
        return this.turns;
    }

    public setTurns(turns: number) : void {
        this.turns = turns;
    }

    public getGameID() : string {
        return this.gameId;
    }

    public setGameID(gameId: string) : void {
        this.gameId = gameId;
    }


    public toString() : string {
        return "Score [score=" + this.score + ", player=" + this.player + ", date=" + this.date + "]";
    }
}
