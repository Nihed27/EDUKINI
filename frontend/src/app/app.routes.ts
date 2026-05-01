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
<<<<<<< HEAD
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
=======
  { path: 'login', component: Login },
  { path: 'statut', component: StatutEtudiant },
  { path: 'dashboard-etudiant', component: DashboardEtudiant },
  { path: 'dashboard-admin', component: DashboardAdmin },
  { path: 'enicarthage', component: Enicarthage },
  { path: 'etudiants', component: EtudiantsComponent },
>>>>>>> 4352b6d1f1b6b85d834f592ce4e5e466c9d5a420
];