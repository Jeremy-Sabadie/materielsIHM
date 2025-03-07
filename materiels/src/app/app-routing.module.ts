// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'; // Assure-toi d'importer le bon composant

const routes: Routes = [
  { path: '', component: AppComponent }, // Route par défaut pour afficher le composant principal
  // Tu peux ajouter d'autres routes ici si tu en as besoin
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Utilise forRoot pour définir les routes principales
  exports: [RouterModule], // Exporte le RouterModule pour être utilisé dans d'autres modules
})
export class AppRoutingModule {}
