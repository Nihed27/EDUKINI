import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: "app-accueil",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./accueil.component.html",
  styleUrl: "./accueil.component.css"
})
export class AccueilComponent implements OnInit {
  rang = "—";
  scoreGlobal: number | null = null;
  matieres: any[] = [];
  recommandations: any[] = [];
  private apiUrl = "http://localhost:8081/api";
  constructor(
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.http.get<any>(this.apiUrl + "/profil/1").subscribe({
        next: (profil) => {
          this.rang = profil.rangConcours + "e / 4320";
          this.scoreGlobal = profil.moyenneGenerale;
          this.matieres = [
            { nom: "Mathématiques", note: profil.noteMaths },
            { nom: "Physique", note: profil.notePhysique },
            { nom: "Informatique", note: profil.noteInformatique },
            { nom: "Anglais", note: profil.noteAnglais },
            { nom: "Électronique", note: profil.noteElectronique },
            { nom: "Réseaux", note: profil.noteReseaux }
          ];
          this.cdr.detectChanges();
        },
        error: (err) => console.error("Erreur profil:", err)
      });
      this.http.get<any[]>(this.apiUrl + "/recommandations/1").subscribe({
        next: (data) => {
          this.recommandations = data.map(r => ({
            filiere: r.specialite,
            ecole: r.ecole,
            pct: r.score,
            places: r.placesDisponibles,
            rangMin: r.rangMinimum
          }));
          this.cdr.detectChanges();
        },
        error: (err) => console.error("Erreur recommandations:", err)
      });
    }
  }
  postuler(r: any) {
    this.router.navigate(["/etudiant/candidatures"]);
  }
}
