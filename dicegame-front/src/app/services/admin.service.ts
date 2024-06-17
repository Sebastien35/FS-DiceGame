import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders } from '@angular/common/http';
import { environment } from '../../env';
import { UserServiceService } from './user-service.service';
import { Score } from '../models/score/score';
import { Observable, firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http: HttpClient;
  private apiUrl = environment.apiUrl;
  private getUsersUrl = `${this.apiUrl}/admin/users/all`;
  private getScoresUrl = `${this.apiUrl}/admin/scores/all`;
  private getScoresWithXTurnsUrl = `${this.apiUrl}/Scores/`;

  constructor(
    private httpHandler: HttpHandler,
    private userService: UserServiceService
  ) { 
    this.http = new HttpClient(httpHandler);
  }

  public getAllScores(): Observable<Score[]> {
    return this.http.get<Score[]>(this.getScoresUrl, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.userService.getToken())
    }).pipe(
      map(scores => {
        console.log('Received scores:', scores); // Log the scores to verify
        if (Array.isArray(scores)) {
          return scores.sort((a, b) => b.score - a.score);
        } else {
          throw new Error('Expected an array of scores');
        }
      })
    );
  }

  getAllUsers(): Promise<any> {
    return firstValueFrom(this.http.get(this.getUsersUrl, {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.userService.getToken())
    }));
  }

  deleteUserById(id: number): Promise<any> {
    return firstValueFrom(this.http.delete(
      `${this.apiUrl}/admin/users/${id}`, {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.userService.getToken())
      }
    ));
  }

  public GetScoresWithXTurns(x: number): Observable<Score[]> {
    return this.http.get<Score[]>(`${this.getScoresWithXTurnsUrl}${x}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.userService.getToken()}`)
    }).pipe(
      map(scores => {
        if (Array.isArray(scores)) {
          return scores.sort((a, b) => b.score - a.score);
        } else {
          throw new Error('Expected an array of scores');
        }
      })
    );
  }

  deleteScoreById(id: number): Promise<any> {
    return firstValueFrom(this.http.delete(
      `${this.apiUrl}/admin/scores/${id}`, {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.userService.getToken())
      }
    ));
  }
}