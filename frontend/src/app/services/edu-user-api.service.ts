import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EduUser {
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
export class EduUserApiService {
  private baseUrl = '/api/edu-users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<EduUser[]> {
    return this.http.get<EduUser[]>(this.baseUrl);
  }

  getById(id: number): Observable<EduUser> {
    return this.http.get<EduUser>(`${this.baseUrl}/${id}`);
  }

  create(user: EduUser): Observable<EduUser> {
    return this.http.post<EduUser>(this.baseUrl, user);
  }

  update(id: number, user: EduUser): Observable<EduUser> {
    return this.http.put<EduUser>(`${this.baseUrl}/${id}`, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
