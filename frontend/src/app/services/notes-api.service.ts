import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
export interface EduNote {
  id?: number;
  etudiantId: number;
  filiere: string;
  semestre: number;
  ueNom: string;
  matiereNom: string;
  note: number;
}

@Injectable({ providedIn: 'root' })
export class NotesApiService {
  private baseUrl = `${environment.apiUrl}/api/notes`;

  constructor(private http: HttpClient) {}

  getNotes(etudiantId: number): Observable<EduNote[]> {
    return this.http.get<EduNote[]>(`${this.baseUrl}/${etudiantId}`);
  }

  saveNotes(notes: EduNote[]): Observable<EduNote[]> {
    return this.http.post<EduNote[]>(this.baseUrl, notes);
  }

  deleteNotes(etudiantId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${etudiantId}`);
  }
}
