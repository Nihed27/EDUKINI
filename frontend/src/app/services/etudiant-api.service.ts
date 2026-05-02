import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BackendEtudiant {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  password?: string;
  filiere: string;
  annee: string;
  etablissement: string;
}

@Injectable({ providedIn: 'root' })
export class EtudiantApiService {
  private baseUrl = '/api/etudiants';

  constructor(private http: HttpClient) {}

  getAll(): Observable<BackendEtudiant[]> {
    return this.http.get<BackendEtudiant[]>(this.baseUrl);
  }

  getById(id: number): Observable<BackendEtudiant> {
    return this.http.get<BackendEtudiant>(`${this.baseUrl}/${id}`);
  }

  create(etudiant: BackendEtudiant): Observable<BackendEtudiant> {
    return this.http.post<BackendEtudiant>(this.baseUrl, etudiant);
  }

  update(id: number, etudiant: BackendEtudiant): Observable<BackendEtudiant> {
    return this.http.put<BackendEtudiant>(`${this.baseUrl}/${id}`, etudiant);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
