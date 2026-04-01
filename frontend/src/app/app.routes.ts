import { Routes } from '@angular/router';
import { Login } from './login/login';
import { StatutEtudiant } from './statut-etudiant/statut-etudiant';
import { DashboardEtudiant } from './dashboard-etudiant/dashboard-etudiant';
import { DashboardAdmin } from './dashboard-admin/dashboard-admin';
import { Enicarthage } from './enicarthage/enicarthage';
import { EtudiantsComponent } from './etudiants/etudiants.component';
import { Register } from './register/register';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'statut', component: StatutEtudiant },
  { path: 'dashboard-etudiant', component: DashboardEtudiant },
  { path: 'dashboard-admin', component: DashboardAdmin },
  { path: 'enicarthage', component: Enicarthage },
  { path: 'etudiants', component: EtudiantsComponent },
];