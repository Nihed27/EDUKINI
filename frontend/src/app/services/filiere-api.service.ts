import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EnrollmentStats {
  totalEtudiants: number;
  byFiliere: { filiereId: number; count: number }[];
}

export interface BackendFiliere {
  id?: number;
  nom: string;
  code: string;
  icon: string;
  couleur: string;
  description: string;
  capacite: number;
  scoreMin: number;
  duree: string;
  actif: boolean;
  debouches: string[];
  competences: string[];
}

@Injectable({ providedIn: 'root' })
export class FiliereApiService {
  private baseUrl = '/api/filieres';

  constructor(private http: HttpClient) {}

  getAll(): Observable<BackendFiliere[]> {
    return this.http.get<BackendFiliere[]>(this.baseUrl);
  }

  getEnrollmentStats(): Observable<EnrollmentStats> {
    return this.http.get<EnrollmentStats>(`${this.baseUrl}/enrollment-stats`);
  }

  getById(id: number): Observable<BackendFiliere> {
    return this.http.get<BackendFiliere>(`${this.baseUrl}/${id}`);
  }

  create(filiere: BackendFiliere): Observable<BackendFiliere> {
    return this.http.post<BackendFiliere>(this.baseUrl, filiere);
  }

  update(id: number, filiere: BackendFiliere): Observable<BackendFiliere> {
    return this.http.put<BackendFiliere>(`${this.baseUrl}/${id}`, filiere);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
