import { Component, OnInit } from '@angular/core';
import { RequestsService } from './requests.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MockRequestsService } from './mock-requests.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    RouterModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Gestion des Matériels';

  materiels: any[] = [];
  materielForm!: FormGroup;
  isEditing = false;
  currentMaterielId: number | null = null;

  // Déclaration de la variable displayedColumns
  displayedColumns: string[] = ['id', 'nom', 'description', 'actions']; // Colonne pour l'ID, le nom, la description et les actions (modifier/supprimer)

  constructor(
    private requestsService: RequestsService,
    private mockService: MockRequestsService, // Utilisation du Mock Service pour le mock
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadMateriels();
    this.materielForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  onCreate(): void {
    alert('Création de matériel');
  }
  // Utilisation du service de Mock pour charger les matériels (pour tester sans backend)
  loadMateriels(): void {
    this.mockService.getMateriels().subscribe((data) => {
      this.materiels = data;
    });
  }

  // Soumettre le formulaire
  onSubmit(): void {
    if (this.materielForm.invalid) return;

    const materiel = this.materielForm.value;
    if (this.isEditing && this.currentMaterielId !== null) {
      this.requestsService
        .updateMateriel(this.currentMaterielId, materiel)
        .subscribe(() => {
          this.loadMateriels();
          this.resetForm();
        });
    } else {
      this.requestsService.addMateriel(materiel).subscribe(() => {
        this.loadMateriels();
        this.resetForm();
      });
    }
  }

  // Mode édition : récupérer les données du matériel à modifier
  onEdit(materiel: any): void {
    this.isEditing = true;
    this.currentMaterielId = materiel.id;
    this.materielForm.setValue({
      nom: materiel.nom,
      description: materiel.description,
    });
  }

  // Supprimer un matériel
  onDelete(id: number): void {
    this.requestsService.deleteMateriel(id).subscribe(() => {
      this.loadMateriels();
    });
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.materielForm.reset();
    this.isEditing = false;
    this.currentMaterielId = null;
  }
}
