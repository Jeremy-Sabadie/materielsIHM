import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractsService } from '../contracts.service';
import { Contrat } from '../models/contrat.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contrat',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ Ajoute RouterModule pour le routage
  templateUrl: './contracts.component.html', // ✅ Vérifie que le fichier HTML a le bon nom
  styleUrls: ['./contracts.component.css'],
})
export class ContratComponent implements OnInit {
  contrats: Contrat[] = [];
  contratForm!: FormGroup;
  isEditing = false;
  currentContratId: number | null = null;

  constructor(
    private contractsService: ContractsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadContrats();
    console.log('🚀 ContractsComponent a bien été chargé !');

    this.contratForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  loadContrats(): void {
    this.contractsService.getContrats().subscribe((data) => {
      this.contrats = data;
      console.log('Contrats chargés :', this.contrats); // ✅ Vérification
      console.log('Nombre de contrats :', this.contrats.length); // ✅ Vérification supplémentaire
    });
  }

  onSubmit(): void {
    if (this.contratForm.invalid) return;

    if (this.isEditing && this.currentContratId !== null) {
      const updatedContrat: Contrat = {
        id: this.currentContratId,
        ...this.contratForm.value,
      };
      this.contractsService.updateContrat(updatedContrat).subscribe(() => {
        this.loadContrats();
        this.resetForm();
      });
    } else {
      const newContrat: Contrat = { id: 0, ...this.contratForm.value }; // L'ID sera généré
      this.contractsService.addContrat(newContrat).subscribe(() => {
        this.loadContrats();
        this.resetForm();
      });
    }
  }

  onEdit(contrat: Contrat): void {
    this.isEditing = true;
    this.currentContratId = contrat.id;
    this.contratForm.setValue({
      name: contrat.name,
      startDate: contrat.startDate,
      endDate: contrat.endDate,
    });
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce contrat ?')) {
      this.contractsService
        .deleteContrat(id)
        .subscribe(() => this.loadContrats());
    }
  }

  resetForm(): void {
    this.contratForm.reset();
    this.isEditing = false;
    this.currentContratId = null;
  }
}
