import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contrat } from '../app/models/contrat.model';

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  private contrats: Contrat[] = [
    {
      id: 1,
      name: 'Contrat de Maintenance',
      startDate: '2023-01-01',
      endDate: '2025-01-01',
    },
    {
      id: 2,
      name: 'Contrat de Fourniture',
      startDate: '2022-06-15',
      endDate: '2024-06-15',
    },
  ];

  /**
   * Récupère tous les contrats.
   */
  getContrats(): Observable<Contrat[]> {
    return of(this.contrats);
  }

  /**
   * Ajoute un nouveau contrat.
   */
  addContrat(contrat: Contrat): Observable<Contrat> {
    const newId =
      this.contrats.length > 0
        ? Math.max(...this.contrats.map((c) => c.id)) + 1
        : 1;
    const newContrat = { ...contrat, id: newId };
    this.contrats.push(newContrat);
    return of(newContrat);
  }

  /**
   * Met à jour un contrat existant.
   */
  updateContrat(contrat: Contrat): Observable<Contrat | null> {
    const index = this.contrats.findIndex((c) => c.id === contrat.id);
    if (index !== -1) {
      this.contrats[index] = { ...this.contrats[index], ...contrat };
      return of(this.contrats[index]);
    }
    return of(null);
  }

  /**
   * Supprime un contrat par son ID.
   */
  deleteContrat(id: number): Observable<boolean> {
    this.contrats = this.contrats.filter((c) => c.id !== id);
    return of(true);
  }
}
