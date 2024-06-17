import { Component,  OnInit } from '@angular/core'; // Import AfterViewInit
import { ActivatedRoute } from '@angular/router';
import { Player } from '../models/player';
import { NgIf } from '@angular/common';
import { ScoreService } from '../services/score.service';
import { Score } from '../models/score/score';
import { randomBytes, randomInt } from 'crypto';
import { RandomCodeService } from '../services/randomcode.service';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [],
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss'] // Use styleUrls instead of styleUrl for multiple stylesheets
})
export class GameOverComponent implements OnInit { // Implement AfterViewInit

  winner!: string;
  score1!: number;
  score2!: number;
  player1name!: string;
  player2name!: string;
  winningscore!: number;
  turns!: number;
  gameId!: string;

  constructor(private route: ActivatedRoute, 
    private scoreService: ScoreService,
    private randomCodeService: RandomCodeService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.winner = params['winner'];
      this.score1 = Number(params['score1']);
      this.score2 = Number(params['score2']);
      this.player1name= params['player1name'];
      this.player2name= params['player2name'];
      this.winningscore = params['winningscore'];
      this.turns = Number(params['turns']);
      this.gameId = String(params['gameId']);
      
    });
    console.log(this.turns, this.gameId);
  }

  saveScore(event: Event) {
    event.preventDefault();
    let saveBtn=document.querySelector('#saveBtn');
    saveBtn?.setAttribute('disabled', 'true');
    let scoretosave = new Score(
      this.winningscore,
      this.winner,
      new Date(),
      this.turns,
      this.gameId
    );
    console.log(scoretosave);
    if(this.winner === ( `It's a tie`)){
      scoretosave.player = this.player1name + ' and ' + this.player2name;
    }
    this.scoreService.SaveScore(scoretosave).subscribe(
      (score) => {
        console.log('Score saved');
      },
      (error) => {
        console.log('Error saving score');
      }
    );

  }



  

  
}
