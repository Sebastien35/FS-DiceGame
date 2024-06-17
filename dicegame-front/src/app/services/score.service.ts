import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Score } from '../models/score/score';
import { Observable, map } from 'rxjs';
import { UserServiceService } from './user-service.service';
import { environment } from '../../env';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private http: HttpClient;
  private apiUrl = environment.apiUrl;
  private SaveScoreUrl = `${this.apiUrl}/Scores/save`;
  private GetScoresUrl = `${this.apiUrl}/Scores/all`;
  private BaseGetScoreUrl = `${this.apiUrl}/Scores/`;



  constructor(
    private httpHandler: HttpHandler,
    private userService: UserServiceService
    
  ) { 
    this.http = new HttpClient(httpHandler);
    
  }

  

  public SaveScore(score: Score): Observable<Score> {
    return this.http.post<Score>(this.SaveScoreUrl, score , {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.userService.getToken()
      )}
    );
  }

  public GetScores(): Observable<Score[]> {
    return this.http.get<Score[]>(this.GetScoresUrl, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.userService.getToken())
    }).pipe(
      map(scores => scores.sort((a, b) => b.score - a.score)) 
    );
  }

  public GetScoresWithXTurns(x: number): Observable<Score[]> {
    let scores= this.http.get<Score[]>(this.BaseGetScoreUrl + x, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.userService.getToken())
    }).pipe(
      map(scores => scores.sort((a, b) => b.score - a.score)) 
    );
    scores.subscribe(scoresArray => {
      if (scoresArray.length === 0) {
        scoresArray.push(new Score(0, "No scores found", new Date(), 0, "0"));
      }
    });
    return scores;
  }

  
  

  
}
