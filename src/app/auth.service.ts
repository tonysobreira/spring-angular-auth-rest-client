import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

const apiUrl = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  redirectUrl: string;
  jwt:string;

  constructor(private http: HttpClient) { }

  user(): Observable<any> {
    return this.http.get<any>(apiUrl + 'user');
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(apiUrl + 'login', data)
      .pipe(
        tap(_ => this.isLoggedIn = true),
        catchError(this.handleError('login', []))
      );
  }
  
  logout(): Observable<any> {
    return this.http.get<any>(apiUrl + 'signout')
      .pipe(
        tap(_ => this.isLoggedIn = false),
        catchError(this.handleError('logout', []))
      );
  }
  
  register(data: any): Observable<any> {
    return this.http.post<any>(apiUrl + 'register', data)
      .pipe(
        tap(_ => this.log('login')),
        catchError(this.handleError('login', []))
      );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
  
  private log(message: string) {
    console.log(message);
  }

  parseJwt() {
    let jwtHelper = new JwtHelperService();
    let objJwt = jwtHelper.decodeToken(this.jwt);
  }

  loadToken() {
    this.jwt= localStorage.getItem('token');
    this.parseJwt();
  }

  isLogin(){

    if (localStorage.getItem('token')) {
      return this.isLoggedIn = true;
    } else {
      return this.isLoggedIn = false;
    }

  }
  
}
