import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { ScoreService } from '../services/score.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Score } from '../models/score/score';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin-scores',
  standalone: true,
  imports: [
    RouterOutlet, RouterModule, CommonModule
  ],
  templateUrl: './admin-scores.component.html',
  styleUrl: './admin-scores.component.scss'
})
export class AdminScoresComponent {

  constructor(
    private adminService: AdminService,
    private scoreService: ScoreService,
  ){

  }
  scores: any;
  loading :boolean = true;
  error: string = '';
  previous_x: number = 6;
  ngOnInit(): void {
    
  }


  async getScores(x: number) {
    this.previous_x = x;
    try{
      this.scores = await firstValueFrom(this.adminService.GetScoresWithXTurns(x))  ;
      if (this.scores.length === 0 ){
        this.scores.push(new Score(0, "No scores found", new Date(), 0, "0"));
      }
    } catch (error) {
      
      console.log(error);
    }
    ;
  }


  async deleteScoreById(id: number) {
    try{
      await this.adminService.deleteScoreById(id);
      await this.getScores(this.previous_x);
    } catch (error) {
      console.log(error);
    }
     
  }
  

}
