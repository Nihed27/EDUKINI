import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { StatutComponent } from './statut/statut.component';

// Admin
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EcolesComponent } from './ecole/ecoles.component';
import { FilieresComponent } from './filieres/filieres';
import { SpecialitesComponent } from './specialites/specialites';
import { EtudiantsComponent } from './etudiants/etudiants.component';
import { DemandesComponent } from './demandes/demandes';
import { StatistiquesComponent } from './statistiques/statistiques';
import { ParametresComponent } from './parametres/parametres';

// Etudiant Concours
import { EtudiantLayoutComponent } from './etudiant-layout/etudiant-layout.component';
import { AccueilComponent } from './accueil/accueil.component';
import { MesEcolesComponent } from './mes-ecoles/mes-ecoles.component';

import { ProfilEtudiantComponent } from './profil-etudiant/profil-etudiant.component';

// ENICarthage
import { EnicarthageLayoutComponent } from './enicarthage-layout/enicarthage-layout.component';
import { EnicarthageAccueilComponent } from './enicarthage-accueil/enicarthage-accueil.component';
import { EnicarthageProfilComponent } from './enicarthage-profil/enicarthage-profil.component';
 import { EnicarthageRecommandationsComponent } from './enicarthage-recommandations/enicarthage-recommandations.component';
import { EnicarthageMesChoixComponent } from './enicarthage-mes-choix/enicarthage-mes-choix.component';
 import { EnicarthageChatbotComponent } from './enicarthage-chatbot/enicarthage-chatbot.component';

// Master & Doctorat
import { PostlicenceLayoutComponent } from './postlicence-layout/postlicence-layout.component';
import { PostlicenceAccueilComponent } from './postlicence-accueil/postlicence-accueil.component';
import { PostlicenceDetailComponent } from './postlicence-detail/postlicence-detail.component';
import { PostlicenceProgrammesComponent } from './postlicence-programmes/postlicence-programmes.component';

export const routes: Routes = [
  { path: '',         redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',    component: Login },
  { path: 'register', component: Register },
  { path: 'statut',   component: StatutComponent },

  // ── ADMIN ──
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      { path: '',              redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard',    component: DashboardComponent },
      { path: 'ecoles',       component: EcolesComponent },
      { path: 'filieres',     component: FilieresComponent },
      { path: 'specialites',  component: SpecialitesComponent },
      { path: 'etudiants',    component: EtudiantsComponent },
      { path: 'demandes',     component: DemandesComponent },
      { path: 'statistiques', component: StatistiquesComponent },
      { path: 'parametres',   component: ParametresComponent },
    ]
  },

  // ── ETUDIANT CONCOURS ──
  {
    path: 'etudiant',
    component: EtudiantLayoutComponent,
    children: [
      { path: '',              redirectTo: 'accueil', pathMatch: 'full' },
      { path: 'accueil',      component: AccueilComponent },
      { path: 'mes-ecoles',   component: MesEcolesComponent },
     
      { path: 'profil',       component: ProfilEtudiantComponent },
    ]
  },

  // ── ENICARTHAGE ──
  {
    path: 'enicarthage',
    component: EnicarthageLayoutComponent,
    children: [
      { path: '',                redirectTo: 'accueil', pathMatch: 'full' },
      { path: 'accueil',         component: EnicarthageAccueilComponent },
      { path: 'profil',          component: EnicarthageProfilComponent },
       { path: 'recommandations', component: EnicarthageRecommandationsComponent },
      { path: 'mes-choix',       component: EnicarthageMesChoixComponent },
       { path: 'chatbot', component: EnicarthageChatbotComponent },
    ]
  },

  // ── MASTER & DOCTORAT ──
  {
    path: 'postlicence',
    component: PostlicenceLayoutComponent,
    children: [
      { path: '',                   redirectTo: 'accueil', pathMatch: 'full' },
      { path: 'accueil',            component: PostlicenceAccueilComponent },
      { path: 'programmes',         component: PostlicenceProgrammesComponent },
      { path: 'programme/:id',      component: PostlicenceDetailComponent },
    ]
  },

  { path: '**', redirectTo: 'login' }
];