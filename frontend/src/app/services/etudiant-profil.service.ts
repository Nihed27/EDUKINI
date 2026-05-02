import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EtudiantProfil {
  id?: number;
  nom: string;
  prenom: string;
  moyenneGenerale: number;
  noteMaths: number;
  notePhysique: number;
  noteInformatique: number;
  noteAnglais: number;
  noteElectronique: number;
  noteReseaux: number;
  rangConcours: number;
  etudiantId: number;
}

@Injectable({
  providedIn: 'root'
})
export class EtudiantProfilService {
  private apiUrl = 'http://localhost:8081/api/profil';

  constructor(private http: HttpClient) { }

  saveProfile(profil: EtudiantProfil): Observable<EtudiantProfil> {
    return this.http.post<EtudiantProfil>(this.apiUrl, profil);
  }

  getProfil(etudiantId: number): Observable<EtudiantProfil> {
    return this.http.get<EtudiantProfil>(`${this.apiUrl}/${etudiantId}`);
  }
}
