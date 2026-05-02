import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'login',
    renderMode: RenderMode.Client
  },
  {
    path: 'register',
    renderMode: RenderMode.Client
  },
  {
    path: 'statut',
    renderMode: RenderMode.Client
  },
  {
    path: 'admin/**',
    renderMode: RenderMode.Client
  },
  {
    path: 'etudiant/**',
    renderMode: RenderMode.Client
  },
  {
    path: 'enicarthage/**',
    renderMode: RenderMode.Client
  },
  {
    path: 'postlicence/**',
    renderMode: RenderMode.Client
  },
  {
    path: 'dashboard-admin',
    renderMode: RenderMode.Client
  },
  {
    path: 'dashboard-etudiant',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];