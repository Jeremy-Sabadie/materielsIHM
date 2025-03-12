import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
 * Interface représentant un matériel.
 */
interface Materiel {
  id: number;
  nom: string;
  description: string;
  serviceDat: string;
  endGarantee: string;
  proprietaireId: number;
  categories?: number[];
}

/**
 * Interface représentant une catégorie de matériel.
 */
interface Category {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class MockRequestsService {
  /**
   * Liste des matériels simulés.
   */
  private materiels: Materiel[] = [
    {
      id: 1,
      nom: 'Ordinateur portable',
      description: 'PC de bureau',
      serviceDat: '2023-01-15',
      endGarantee: '2024-01-15',
      proprietaireId: 101,
      categories: [1, 2],
    },
    {
      id: 2,
      nom: 'Imprimante Laser',
      description: 'Imprimante de haute qualité',
      serviceDat: '2022-05-20',
      endGarantee: '2023-05-20',
      proprietaireId: 102,
      categories: [3],
    },
    {
      id: 3,
      nom: 'Scanner A3',
      description: 'Scanner pour grands formats',
      serviceDat: '2021-10-01',
      endGarantee: '2023-10-01',
      proprietaireId: 103,
      categories: [1, 3],
    },
    {
      id: 4,
      nom: 'Souris sans fil',
      description: 'Souris ergonomique',
      serviceDat: '2021-11-10',
      endGarantee: '2023-11-10',
      proprietaireId: 104,
      categories: [1],
    },
    {
      id: 5,
      nom: 'Track pad',
      description: 'Pavé tactile avancé',
      serviceDat: '2021-12-05',
      endGarantee: '2023-12-05',
      proprietaireId: 105,
      categories: [2],
    },
  ];

  /**
   * Liste des catégories simulées.
   */
  private categories: Category[] = [
    { id: 1, name: 'Informatique' },
    { id: 2, name: 'Bureautique' },
    { id: 3, name: 'Impression' },
  ];

  /**
   * Retourne la liste des matériels sous forme d'un Observable.
   */
  getMateriels(): Observable<Materiel[]> {
    return of(this.materiels);
  }

  /**
   * Ajoute un nouveau matériel à la liste simulée.
   */
  addMateriel(materiel: Materiel): Observable<Materiel> {
    const newId =
      this.materiels.length > 0
        ? Math.max(...this.materiels.map((m) => m.id)) + 1
        : 1; // Génère un ID unique
    const newMateriel = { ...materiel, id: newId };
    this.materiels.push(newMateriel);

    console.log('MockService - Liste après ajout :', this.materiels); // Vérification en temps réel
    return of(newMateriel);
  }

  /**
   * Met à jour un matériel existant.
   */
  updateMateriel(materiel: Materiel): Observable<Materiel | null> {
    const index = this.materiels.findIndex((m) => m.id === materiel.id);
    if (index !== -1) {
      this.materiels[index] = { ...this.materiels[index], ...materiel };
      console.log('MockService - Liste après mise à jour :', this.materiels); // Vérification
      return of(this.materiels[index]);
    }
    return of(null);
  }

  /**
   * Supprime un matériel de la liste simulée.
   */
  deleteMateriel(id: number): Observable<boolean> {
    this.materiels = this.materiels.filter((m) => m.id !== id);
    console.log('MockService - Liste après suppression :', this.materiels); // Vérification
    return of(true);
  }
}
