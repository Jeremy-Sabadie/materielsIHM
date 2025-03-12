import { Component, OnInit } from '@angular/core';
import { MockRequestsService } from './mock-requests.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {
  RouterModule,
  RouterOutlet,
  Router,
  NavigationEnd,
} from '@angular/router';

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
  isFormChanged: boolean = false; // Indique si le formulaire a été modifié
  originalMateriel: any = null; // Stocke les valeurs originales du matériel en cours d'édition
  materiels: any[] = []; // Liste des matériels affichés dans le tableau
  materielForm!: FormGroup; // Formulaire de gestion des matériels
  isEditing = false; // Indique si l'on est en mode édition
  currentMaterielId: number | null = null; // ID du matériel en cours de modification
  isOnContratPage: boolean = false; // Indique si on est sur la page des contrats

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
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMateriels();

    // Détection de la page actuelle pour masquer/afficher le contenu
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isOnContratPage = this.router.url === '/contrats';
      }
    });

    // Création du formulaire avec validation
    this.materielForm = this.fb.group(
      {
        nom: ['', Validators.required],
        description: ['', Validators.required],
        serviceDat: ['', Validators.required],
        endGarantee: ['', Validators.required],
      },
      { validator: this.dateValidation }
    );

    // Détection des changements
    this.materielForm.valueChanges.subscribe(() => {
      this.isFormChanged = this.hasFormChanged();
    });
  }

  dateValidation(form: FormGroup) {
    const serviceDate = new Date(form.get('serviceDat')?.value);
    const endGaranteeDate = new Date(form.get('endGarantee')?.value);
    return endGaranteeDate > serviceDate ? null : { invalidDate: true };
  }

  loadMateriels(): void {
    this.requestsService.getMateriels().subscribe((data) => {
      this.materiels = data;
    });
  }

  onSubmit(): void {
    if (this.materielForm.invalid) return;

    if (this.isEditing && this.currentMaterielId !== null) {
      const materielName = this.originalMateriel?.nom || 'ce matériel';
      if (
        !confirm(
          `Êtes-vous sûr de vouloir modifier le matériel "${materielName}" ?`
        )
      ) {
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
    this.originalMateriel = { ...materiel };
    this.isFormChanged = false;

    this.materielForm.setValue({
      nom: materiel.nom,
      description: materiel.description,
      serviceDat: materiel.serviceDat,
      endGarantee: materiel.endGarantee,
    });
  }

  onDelete(id: number): void {
    const materiel = this.materiels.find((m) => m.id === id);
    if (!materiel) return;

    if (
      !confirm(
        `Êtes-vous sûr de vouloir supprimer le matériel "${materiel.nom}" ?`
      )
    ) {
      return;
    }

    this.requestsService.deleteMateriel(id).subscribe(() => {
      this.loadMateriels();
    });
  }

  hasFormChanged(): boolean {
    if (!this.originalMateriel || !this.materielForm) return false;

    return (
      this.originalMateriel.nom !== this.materielForm.value.nom ||
      this.originalMateriel.description !==
        this.materielForm.value.description ||
      this.originalMateriel.serviceDat !== this.materielForm.value.serviceDat ||
      this.originalMateriel.endGarantee !== this.materielForm.value.endGarantee
    );
  }

  resetForm(): void {
    this.materielForm.reset();
    this.isEditing = false;
    this.currentMaterielId = null;
    this.originalMateriel = null;
    this.isFormChanged = false;
    this.materielForm.setValue({
      nom: '',
      description: '',
      serviceDat: '',
      endGarantee: '',
    });
  }
}
