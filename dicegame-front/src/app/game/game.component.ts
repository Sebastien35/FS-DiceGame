import { Component, OnInit } from '@angular/core';
import { Dice } from '../models/dice';
import { Player } from '../models/player';
import { playDiceAnimation } from '../scripts/playDiceAnimation';

import { ScoreService } from '../services/score.service';
import { Score } from '../models/score/score';
import { RandomCodeService } from '../services/randomcode.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  dice: Dice;
  player1: Player;  
  player2: Player;
  turnCounter: number;
  result: number;
  currentPlayer: Player;
  turns: number;
  Player1ScoreArray: number[] = [];
  Player2ScoreArray: number[] = [];
  gameId: string;
  

  constructor(
    private scoreService: ScoreService,
    private randomCodeService: RandomCodeService
  ) {
    this.dice = new Dice();
    this.player1 = new Player('');
    this.player2 = new Player('');
    this.turnCounter = 0;
    this.currentPlayer = this.player1;
    this.result = 0;
    this.turns = 6;
    this.Player1ScoreArray = [];
    this.Player2ScoreArray = [];
    this.gameId = '';


    
  }
  ngOnInit(): void {
    this.gameId = this.randomCodeService.generateRandomCode();
  }

 
  
  setTurns(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.turns = parseInt(target.value, 10);
    this.removeTurnInput();
    }

  setPlayer1Name(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.player1.name = target.value;
  }

  setPlayer2Name(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.player2.name = target.value;
  }

  startGame(event: Event): void {
    const gameConfig = document.querySelector('.game-config');
    const gameContainer = document.querySelector('#game-container');
    if(this.player1.name === '' || this.player2.name === '') {
      alert('Please enter the names of both players');
      return;
    } else {
    gameConfig?.classList.add('d-none');
    gameContainer?.classList.remove('d-none');
    }
  }



  rollDice(): void {
    this.playThrowSound();
    this.removeTurnInput();
    this.turnCounter++;
    this.result = this.dice.roll();
    this.playDiceAnimation(this.result);
    this.scoreKeeper();
    setTimeout(() => {
    this.currentPlayer.setNewScore(this.currentPlayer.getScore() + this.result);
    if(this.turnCounter % 3 === 0){
      this.switchPlayer();
      
    }
    if(this.turnCounter === this.turns){
      this.winCondition();
    }
  }, 1000);

    
  }

  switchPlayer(): void {
    // Determine the next player based on the current one
    if (this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }
    console.log(`Current player switched to: ${this.currentPlayer.name}`);
  }

  winCondition(): void {
    // Play the ding sound
    this.playGameOverAnimation();
    this.playDingSound();
  
    // Schedule the rest of the code to run after a one-second delay
    setTimeout(() => {
      let url = '';
  
      if (this.player1.score > this.player2.score) {
        console.log(`Player 1 wins with a score of ${this.player1.score}`);
        url = `/game-over?winner=${this.player1.name}&score1=${this.player1.score}&score2=${this.player2.score}&winningscore=${this.player1.score}&player1name=${this.player1.name}&player2name=${this.player2.name}&turns=${this.turns}&gameId=${this.gameId}`;

      } else if (this.player2.score > this.player1.score) {
        console.log(`Player 2 wins with a score of ${this.player2.score}`);
        url = `/game-over?winner=${this.player2.name}&score1=${this.player1.score}&score2=${this.player2.score}&winningscore=${this.player2.score}&player1name=${this.player1.name}&player2name=${this.player2.name}&turns=${this.turns}&gameId=${this.gameId}`;
      } else {
        console.log(`It's a tie Both players have a score of ${this.player1.score}`);
        url = `/game-over?winner=It's a tie&score1=${this.player1.score}&score2=${this.player2.score}&winningscore=${this.player1.score}&player1name=${this.player1.name}&player2name=${this.player2.name}&turns=${this.turns}`;	
      }
  
      // Redirect to the game over page
      window.location.replace(url);
    }, 1000); // Delay in milliseconds (1000ms = 1s)
  }
  

  playDingSound(): void {
    const audio = new Audio();
    audio.src = '../../assets/sounds/ding.mp3';
    audio.load();
    audio.play();
  }
  
  

  playThrowSound(): void {
    const audio = new Audio();
    audio.src = '../../assets/sounds/dice-throw.mp3';
    audio.load();
    audio.play();
  }

  playGameOverAnimation(): void {
    const rollBtn = document.querySelector('.image-btn');
    rollBtn?.classList.add('d-none');
    const gameOver = document.querySelector('.game-over');
    gameOver?.classList.remove('d-none');
    const currentPlayer = document.querySelector('.current-player');
    currentPlayer?.classList.add('d-none');
    const scoreBoard = document.querySelector('.score-board');
    scoreBoard?.classList.add('d-none');


  }

  removeTurnInput(): void {
    const turnInputDiv = document.querySelector('.turnInputDiv');
    const turnNumberDisplay = document.querySelector('.turnNumberDisplay'); 
    turnInputDiv?.classList.add('d-none');
    turnNumberDisplay?.classList.remove('d-none');
    
  }
  playDiceAnimation(result: number): void {
    playDiceAnimation(result);
  }

  scoreKeeper(): void {
    let plus2 = document.querySelector('.plus2');
    let plus3 = document.querySelector('.plus3');

    if (this.currentPlayer === this.player1) {
      this.Player1ScoreArray.push(this.result);
      if (this.Player1ScoreArray.length > 1){
        const length = this.Player1ScoreArray.length;
        if (this.Player1ScoreArray[length - 1] === this.Player1ScoreArray[length - 2]) {
          console.log('Player 1 has the same result twice in a row!');
          this.player1.score += 2;
          this.playDingSound();
          if(plus2){
            plus2.classList.add('play');
            setTimeout(() => {
              plus2.classList.remove('play');
            }, 1000);
          }
        }
      }
    } else {
      this.Player2ScoreArray.push(this.result);
      if (this.Player2ScoreArray.length > 1){
        const length = this.Player2ScoreArray.length;
        if (this.Player2ScoreArray[length - 1] === this.Player2ScoreArray[length - 2]) {
          console.log('Player 2 has the same result twice in a row!');
          this.player2.score += 2;
          this.playDingSound();
        }
      }
    }

    
  }


  
  

}

