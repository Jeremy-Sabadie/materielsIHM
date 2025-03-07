import { Component, OnInit } from '@angular/core';
import { RequestsService } from './requests.service';
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
    RouterModule, // Regroupe tout ici
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

  constructor(
    private requestsService: RequestsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadMateriels();
    this.materielForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  loadMateriels(): void {
    this.requestsService.getMateriels().subscribe((data) => {
      this.materiels = data;
    });
  }

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

  onEdit(materiel: any): void {
    this.isEditing = true;
    this.currentMaterielId = materiel.id;
    this.materielForm.setValue({
      nom: materiel.nom,
      description: materiel.description,
    });
  }

  onDelete(id: number): void {
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
