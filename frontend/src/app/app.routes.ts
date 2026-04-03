// app.routes.ts
import { Routes } from '@angular/router';
import { FilieresComponent } from './filieres/filieres';
import { SpecialitesComponent } from './specialites/specialites';
import { DemandesComponent } from './demandes/demandes';
import { StatistiquesComponent } from './statistiques/statistiques';

export const routes: Routes = [
  { path: 'filieres',    component: FilieresComponent },
  { path: 'specialites', component: SpecialitesComponent },  // ← vérifie que c'est bien SpecialitesComponent
  { path: '', redirectTo: 'filieres', pathMatch: 'full' },
  { path: 'demandes', component: DemandesComponent },
  { path: 'statistiques', component: StatistiquesComponent },

];