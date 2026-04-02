import { Routes } from '@angular/router';
import { EtudiantsComponent } from './etudiants/etudiants.component';
import { ParametresComponent } from './parametres/parametres';  // ← sans .component

export const routes: Routes = [
  { path: 'etudiants', component: EtudiantsComponent },
  { path: 'parametres', component: ParametresComponent },
  { path: '', redirectTo: 'etudiants', pathMatch: 'full' },
];