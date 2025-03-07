import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  private apiUrl = 'http://localhost:5229/api/materiels'; // URL à vérifier avec l'api SpringBoot.

  constructor(private http: HttpClient) {}

  getMateriels(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addMateriel(materiel: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, materiel);
  }

  updateMateriel(id: number, materiel: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, materiel);
  }

  deleteMateriel(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
