import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError, switchMap, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:5000';  

  constructor(private http: HttpClient) {}

  login(userCredentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userCredentials).pipe(
      catchError(this.handleError)
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      catchError(this.handleError)
    );
  }

  logout(): Observable<any> {
    const token = this.getAccessToken();

    

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post(`${this.apiUrl}/logout`, {}, { headers }).pipe(
      tap(() => this.clearTokens()) // Clear tokens on successful logout
    );
  }

  /*refreshToken(refreshToken: string): Observable<any> {
    console.log('Refreshing token. Refresh token:', refreshToken);
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${refreshToken}` });
    console.log(headers)
    return this.http.post(`${this.apiUrl}/refresh`, {}, { headers });
  }*/
  refreshToken(refreshToken: string): Observable<any> {
    console.log('Refreshing token. Refresh token:', refreshToken);
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${refreshToken}` });
    const body = { refresh_token: refreshToken };
    return this.http.post(`${this.apiUrl}/refresh`, {}, { headers });
  }

 
  saveAccessToken(access_token: string): void {
    
    localStorage.setItem('access_token', access_token);
    
  }
  saveRefreshToken(refresh_token: string ): void {
    
    
    localStorage.setItem('refresh_token', refresh_token);
  }
  saveUserId(user_id:string):void{
  localStorage.setItem('user_id', user_id);
  }
  removeUserId():void{
  localStorage.removeItem('user_id');
  }
  getAccessToken(): string | null {
    
    return localStorage.getItem('access_token');
  }
  getUser(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }
  getRefreshToken(): string | null {
    
    return localStorage.getItem('refresh_token');
  }
  loadAuthenticatedUser(){
    return localStorage.getItem('user_id')
  }

  // Clear tokens from localStorage or cookies
  clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
  

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 409) {
      // Customize the error handling for status code 409 (Conflict)
      const errorMessage = error.error.message || 'A user with that email already exists.';
      return throwError(errorMessage);
    } 
    else if(error.status===401){
      const errorMessage = error.error.message || 'Invalid credentials.';
      return throwError(errorMessage);
    }
    else {
      // Handle other types of errors here or rethrow for generic handling
      return throwError('An unexpected error occurred.');
    }
  }
}