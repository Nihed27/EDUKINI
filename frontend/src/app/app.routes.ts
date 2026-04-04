import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EcolesComponent } from './ecole/ecoles.component';
import { FilieresComponent } from './filieres/filieres';
import { SpecialitesComponent } from './specialites/specialites';
import { EtudiantsComponent } from './etudiants/etudiants.component';
import { DemandesComponent } from './demandes/demandes';
import { StatistiquesComponent } from './statistiques/statistiques';
import { ParametresComponent } from './parametres/parametres';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'ecoles', component: EcolesComponent },
      { path: 'filieres', component: FilieresComponent },
      { path: 'specialites', component: SpecialitesComponent },
      { path: 'etudiants', component: EtudiantsComponent },
      { path: 'demandes', component: DemandesComponent },
      { path: 'statistiques', component: StatistiquesComponent },
      { path: 'parametres', component: ParametresComponent },
    ]
  },
  { path: '**', redirectTo: 'login' }
];