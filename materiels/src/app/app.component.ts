/* app.component.ts */
import { Component, OnInit } from '@angular/core';
import { MockRequestsService } from './mock-requests.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, RouterOutlet } from '@angular/router';

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

  displayedColumns: string[] = [
    'id',
    'nom',
    'description',
    'serviceDat',
    'endGarantee',
    'actions',
  ];

  constructor(
    private requestsService: MockRequestsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadMateriels();
    this.materielForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      serviceDat: ['', Validators.required],
      endGarantee: ['', Validators.required],
    });
  }

  loadMateriels(): void {
    this.requestsService.getMateriels().subscribe((data) => {
      this.materiels = data;
    });
  }

  onSubmit(): void {
    if (this.materielForm.invalid) return;

    if (this.isEditing && this.currentMaterielId !== null) {
      if (!confirm('Êtes-vous sûr de vouloir mettre à jour ce matériel ?')) {
        return;
      }

      const materiel = {
        ...this.materielForm.value,
        id: this.currentMaterielId,
      };
      this.requestsService.updateMateriel(materiel).subscribe(() => {
        this.loadMateriels();
        this.resetForm();
      });
    } else {
      const materiel = { ...this.materielForm.value };
      this.requestsService.addMateriel(materiel).subscribe(() => {
        this.loadMateriels();
        this.resetForm();
      });
    }
  }

  onEdit(materiel: any): void {
    this.isEditing = true;
    this.currentMaterielId = materiel.id;
    this.materielForm.setValue({
      nom: materiel.nom,
      description: materiel.description,
      serviceDat: materiel.serviceDat,
      endGarantee: materiel.endGarantee,
    });
  }

  onDelete(id: number): void {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce matériel ?')) {
      return;
    }

    this.requestsService.deleteMateriel(id).subscribe(() => {
      this.loadMateriels();
    });
  }

  resetForm(): void {
    this.materielForm.reset();
    this.isEditing = false;
    this.currentMaterielId = null;
  }
}
