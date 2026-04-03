import { Routes } from '@angular/router';
import { EtudiantsComponent } from './etudiants/etudiants.component';
import { EcolesComponent } from './ecole/ecoles.component';
import { DemandesComponent } from './demandes/demandes.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'etudiants', component: EtudiantsComponent },
  { path: 'ecole', component: EcolesComponent },
  { path: 'demandes', component: DemandesComponent },
  { path: '', redirectTo: 'etudiants', pathMatch: 'full' },
];