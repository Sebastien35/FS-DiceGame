
import { Inject, Injectable, PLATFORM_ID} from '@angular/core';

import { User } from '../models/user/user';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { response } from 'express';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { environment } from '../../env';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private http: HttpClient;

  private isAuthenticated = new BehaviorSubject<boolean>(this.checkInitialAuthentication());


  private apiUrl = environment.apiUrl;

  private registerUrl= `${this.apiUrl}/register`;
  private connectUrl= `${this.apiUrl}/connect`;
  private logoutUrl= `${this.apiUrl}/disconnect`;
  private refreshUrl= `${this.apiUrl}/refreshToken`;

  constructor(
     private httpHandler: HttpHandler,

     @Inject(PLATFORM_ID) private platformId: Object,
     @Inject(Router) private router: Router


     ) {
    this.http = new HttpClient(httpHandler);

   }

   private checkInitialAuthentication(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }

   public save(user: User): Observable<User> {
    return this.http.post<User>(this.registerUrl, user);
   }

   connect(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.connectUrl, user, { headers }).pipe(
       // Extract the token from the response
      tap(response => {
        if (response) {
            const bearerToken = response.bearer;
            const refreshToken = response.refresh;

            localStorage.setItem('token', bearerToken);
            localStorage.setItem('refreshToken', refreshToken);

            this.isAuthenticated.next(true);
            window.location.replace('/');
        }
    }));

  }

  refreshToken():Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    const refreshToken = this.getRefreshToken();
    const requestBody = {
      refreshToken
    }
    return this.http.post<any>(this.refreshUrl, requestBody, { headers }).pipe(
      map(response => response.bearer), // Extract the token from the response
      tap(response => {
        if (response) {

            const bearerToken = response.bearer;
            const refreshToken = response.refresh;


            localStorage.setItem('token', bearerToken);
            localStorage.setItem('refreshToken', refreshToken);
        };
      }));
  }

  public logout(){

    const headers = new HttpHeaders(
      { 'Content-Type': 'application/json' })
      .set('Authorization', 'Bearer ' + this.getToken());
    this.isAuthenticated.next(false);

     this.http.post(
      this.logoutUrl,
      this.getToken(),
      { headers }
      );
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      this.router.navigate(['/']);


  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  getRefreshToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('refreshToken');
    }
    return null;
  }


  isUserAuthenticated(): boolean {
    return this.isAuthenticated.getValue();
  }

  getRoleFromToken(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    const decodedToken: any = jwtDecode(token);
    return decodedToken.role;
  }

  hasRole(role: string): boolean {
    const userRole = this.getRoleFromToken();
    return userRole === role;
  }

  public isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }








}
