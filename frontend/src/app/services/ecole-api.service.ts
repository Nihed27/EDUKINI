import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BackendEcole {
  id?: number;
  nom: string;
  sigle: string;
  universite: string;
  region: string;
  adresse: string;
  filieres: string[];
}

@Injectable({ providedIn: 'root' })
export class EcoleApiService {
  private baseUrl = '/api/ecoles';

  constructor(private http: HttpClient) {}

  getAll(): Observable<BackendEcole[]> {
    return this.http.get<BackendEcole[]>(this.baseUrl);
  }

  getById(id: number): Observable<BackendEcole> {
    return this.http.get<BackendEcole>(`${this.baseUrl}/${id}`);
  }

  create(ecole: BackendEcole): Observable<BackendEcole> {
    return this.http.post<BackendEcole>(this.baseUrl, ecole);
  }

  update(id: number, ecole: BackendEcole): Observable<BackendEcole> {
    return this.http.put<BackendEcole>(`${this.baseUrl}/${id}`, ecole);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
