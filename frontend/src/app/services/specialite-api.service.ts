import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BackendSpecialite {
  id?: number;
  nom: string;
  code: string;
  icon: string;
  filiereId: number;
  description: string;
  capacite: number;
  annee: string;
  actif: boolean;
  debouches: string[];
  competences: string[];
}

@Injectable({ providedIn: 'root' })
export class SpecialiteApiService {
  private baseUrl = '/api/specialites';

  constructor(private http: HttpClient) {}

  getAll(): Observable<BackendSpecialite[]> {
    return this.http.get<BackendSpecialite[]>(this.baseUrl);
  }

  getById(id: number): Observable<BackendSpecialite> {
    return this.http.get<BackendSpecialite>(`${this.baseUrl}/${id}`);
  }

  create(specialite: BackendSpecialite): Observable<BackendSpecialite> {
    return this.http.post<BackendSpecialite>(this.baseUrl, specialite);
  }

  update(id: number, specialite: BackendSpecialite): Observable<BackendSpecialite> {
    return this.http.put<BackendSpecialite>(`${this.baseUrl}/${id}`, specialite);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
