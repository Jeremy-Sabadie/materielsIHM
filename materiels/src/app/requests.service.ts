import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Materiel {
  id?: number;
  name: string;
  proprietaireId: number;
  serviceDat: string;
  lastUpdate: string;
  categories?: number[];
  endGarantee: string;
}

interface Category {
  id: number;
  name: string;
}

interface DTOmaterielRequest {
  name: string;
  proprietaireId: number;
  serviceDat: string;
  lastUpdate: string;
  categories: number[];
  endGarantee: string;
}

interface DTOmaterielResponse {
  id: number;
  categories: number[];
  endGarantee: string;
  proprietaireId: number;
  name: string;
  serviceDat: string;
  lastUpdate: string;
}

@Injectable({ providedIn: 'root' })
export class RequestsService {
  private readonly apiUrl = 'http://localhost:5229/api/materiels';

  constructor(private http: HttpClient) {}

  getMateriels(): Observable<Materiel[]> {
    return this.http.get<Materiel[]>(`${this.apiUrl}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getMaterielByCategory(idCat: number): Observable<Materiel[]> {
    return this.http.get<Materiel[]>(`${this.apiUrl}/category/${idCat}`);
  }

  addMateriel(materiel: Materiel): Observable<Materiel> {
    const requestDTO: DTOmaterielRequest = {
      name: materiel.name,
      proprietaireId: materiel.proprietaireId,
      serviceDat: materiel.serviceDat,
      lastUpdate: materiel.lastUpdate,
      categories: materiel.categories || [],
      endGarantee: materiel.endGarantee,
    };
    return this.http.post<Materiel>(`${this.apiUrl}`, requestDTO);
  }

  updateMateriel(materiel: Materiel): Observable<Materiel> {
    const requestDTO: DTOmaterielRequest = {
      name: materiel.name,
      proprietaireId: materiel.proprietaireId,
      serviceDat: materiel.serviceDat,
      lastUpdate: materiel.lastUpdate,
      categories: materiel.categories || [],
      endGarantee: materiel.endGarantee,
    };
    return this.http.put<Materiel>(`${this.apiUrl}/${materiel.id}`, requestDTO);
  }

  deleteMateriel(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  searchMateriel(keyValue: string): Observable<Materiel[]> {
    return this.http.get<Materiel[]>(
      `${this.apiUrl}/search?keyValue=${keyValue}`
    );
  }

  getMaterialCategories(idMat: number): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories/${idMat}`);
  }

  userLogin(values: any): Observable<string | null> {
    return new Observable((observer) => {
      this.http
        .post<{ access_token: string }>(
          'http://localhost:5229/api/user/login',
          values
        )
        .subscribe({
          next: (response) => observer.next(response.access_token),
          error: () => observer.next(null),
          complete: () => observer.complete(),
        });
    });
  }
}
