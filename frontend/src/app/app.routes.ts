import { Routes } from '@angular/router';
import { Login } from './login/login';
import { StatutEtudiant } from './statut-etudiant/statut-etudiant';
import { DashboardEtudiant } from './dashboard-etudiant/dashboard-etudiant';
import { DashboardAdmin } from './dashboard-admin/dashboard-admin';
import { Enicarthage } from './enicarthage/enicarthage';
import { EtudiantsComponent } from './etudiants/etudiants.component';
import { Register } from './register/register';

// Master & Doctorat
import { PostlicenceLayoutComponent } from './postlicence-layout/postlicence-layout.component';
import { PostlicenceAccueilComponent } from './postlicence-accueil/postlicence-accueil.component';
import { PostlicenceDetailComponent } from './postlicence-detail/postlicence-detail.component';
import { PostlicenceProgrammesComponent } from './postlicence-programmes/postlicence-programmes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: Register },
]