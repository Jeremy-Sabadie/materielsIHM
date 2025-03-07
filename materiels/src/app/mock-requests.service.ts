import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockRequestsService {
  // Exemple de données simulées pour la table materiel
  private materiels = [
    {
      id: 1,
      name: 'Ordinateur portable',
      serviceDat: new Date('2023-01-15T10:00:00'),
      endGarantee: new Date('2024-01-15T10:00:00'),
      proprietaireId: 101,
    },
    {
      id: 2,
      name: 'Imprimante Laser',
      serviceDat: new Date('2022-05-20T14:00:00'),
      endGarantee: new Date('2023-05-20T14:00:00'),
      proprietaireId: 102,
    },
    {
      id: 3,
      name: 'Scanner A3',
      serviceDat: new Date('2021-10-01T09:30:00'),
      endGarantee: new Date('2023-10-01T09:30:00'),
      proprietaireId: 103,
    },
  ];

  constructor() {}

  // Simuler l'appel à une API pour obtenir la liste des matériels
  getMateriels(): Observable<any[]> {
    return of(this.materiels); // Retourne un Observable contenant la liste des matériels
  }

  // Simuler l'ajout d'un nouveau matériel
  addMateriel(materiel: any): Observable<any> {
    const newMateriel = { ...materiel, id: this.materiels.length + 1 }; // Crée un nouvel ID pour le matériel
    this.materiels.push(newMateriel); // Ajoute le matériel à la liste
    return of(newMateriel); // Retourne l'élément ajouté
  }

  // Simuler la mise à jour d'un matériel
  updateMateriel(id: number, updatedMateriel: any): Observable<any> {
    const index = this.materiels.findIndex((m) => m.id === id);
    if (index !== -1) {
      this.materiels[index] = { ...this.materiels[index], ...updatedMateriel };
      return of(this.materiels[index]); // Retourne le matériel mis à jour
    }
    return of(null); // Si le matériel n'est pas trouvé, on retourne null
  }

  // Simuler la suppression d'un matériel
  deleteMateriel(id: number): Observable<any> {
    const index = this.materiels.findIndex((m) => m.id === id);
    if (index !== -1) {
      const deletedMateriel = this.materiels.splice(index, 1);
      return of(deletedMateriel); // Retourne le matériel supprimé
    }
    return of(null); // Si le matériel n'est pas trouvé, on retourne null
  }
}
