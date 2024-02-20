import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = 'http://127.0.0.1:5000';  
  constructor(private http: HttpClient) {}
    
  /*getAnimals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/animals`);
  }*/
  /*getAnimals(animalType?: string): Observable<any[]> {
    // Use HttpParams to include query parameters
    let params = new HttpParams();
    if (animalType) {
      params = params.set('type', animalType);
    }

    return this.http.get<any[]>(`${this.apiUrl}/animals`, { params });
  }*/
  getAnimals(params: HttpParams): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/animals`, { params });
  }

  uploadPet(formData: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(`${this.apiUrl}/animals`, formData, { headers });
  }
  getAnimalDetails(animalId: number): Observable<any> {
    const url = `${this.apiUrl}/animal/${animalId}`;
    return this.http.get<any>(url);
  }
  getFavorites(): Observable<any> {
    return this.http.get(`${this.apiUrl}/favorites`);
  }

  addFavorite(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/favorites/add`, data);

  }
  deleteFavorite(animalId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/favorites/delete/${animalId}`);

  }
  deletePost(animalId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/animal/delete/${animalId}`);
  }

  sendEmail(emailData: any) {
    
    console.log(emailData)
    return this.http.post(`${this.apiUrl}/send_email`, emailData, {
      headers: {'Content-Type': 'application/json'}
    });
  }
  getUserPosts(): Observable<any> {
    
    return this.http.get(`${this.apiUrl}/user/posts`, {}
    );
  }

}