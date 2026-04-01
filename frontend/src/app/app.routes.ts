import { Routes } from '@angular/router';
import { EtudiantsComponent } from './etudiants/etudiants.component';

export const routes: Routes = [
  { path: 'etudiants', component: EtudiantsComponent },
  { path: '', redirectTo: 'etudiants', pathMatch: 'full' },
];