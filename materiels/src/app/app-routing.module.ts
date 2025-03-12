// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContratComponent } from './contracts/contracts.component'; // Import du composant Contrat

const routes: Routes = [
  { path: '', component: AppComponent }, // Page principale
  { path: 'contrats', component: ContratComponent }, // Route pour afficher les contrats
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
