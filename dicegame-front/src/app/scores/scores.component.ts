import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../services/score.service';
import { Score } from '../models/score/score';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.scss'
})
export class ScoresComponent implements OnInit{

  
  constructor(private scoreService: ScoreService) {

    
  }

  ngOnInit(): void {
    
  }

  scores: any;
  loading :boolean = true;
  error: string = '';

  async getScores(x: number) {
    try{
      this.scores = await firstValueFrom(this.scoreService.GetScoresWithXTurns(x));
      if (this.scores.length === 0 ){
        this.scores.push(new Score(0, "No scores found", new Date(), 0, "0"));
      }
    } catch (error) {
      console.log(error);
    }
  }

  
  
}
