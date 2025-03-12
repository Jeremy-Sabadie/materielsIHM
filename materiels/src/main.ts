import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContratComponent } from './app/contracts/contracts.component';

// Définition des routes
const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'contrats', component: ContratComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Injection correcte de HttpClient
    importProvidersFrom(RouterModule.forRoot(routes)), // Ajout du RouterModule pour gérer la navigation
  ],
}).catch((err) => console.error(err));
