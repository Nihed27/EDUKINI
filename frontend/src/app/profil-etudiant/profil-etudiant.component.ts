import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: "app-profil-etudiant",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./profil-etudiant.component.html",
  styleUrl: "./profil-etudiant.component.css"
})
export class ProfilEtudiantComponent implements OnInit {
  etudiantId = 1;
  loading = false;
  recommandations: any[] = [];
  infos: any[] = [
    { label: "Prénom", valeur: "" },
    { label: "Nom", valeur: "" },
    { label: "Email", valeur: "" },
    { label: "Téléphone", valeur: "" }
  ];
  infosTemp: any[] = [];
  showInfosModal = false;
  rangEtudiant: number | null = null;
  scoreEtudiant: number | null = null;
  filieres = ["Informatique", "Mathématiques", "Physique"];
  filiereSelectionnee: string | null = null;
  matieres: any[] = [
    { nom: "Mathématiques", note: null, coef: 3, key: "noteMaths" },
    { nom: "Physique", note: null, coef: 2, key: "notePhysique" },
    { nom: "Informatique", note: null, coef: 3, key: "noteInformatique" },
    { nom: "Anglais", note: null, coef: 1, key: "noteAnglais" },
    { nom: "Électronique", note: null, coef: 2, key: "noteElectronique" },
    { nom: "Réseaux", note: null, coef: 2, key: "noteReseaux" }
  ];
  showModal = false;
  matiereSelectionnee: any = null;
  formNote: number | null = null;
  formError = "";
  showScoreModal = false;
  formScoreValue: number | null = null;
  showRangModal = false;
  formRangValue: number | null = null;
  private apiUrl = "http://localhost:8081/api";
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http.get<any>(this.apiUrl + "/profil/" + this.etudiantId).subscribe({
      next: (profil) => {
        this.rangEtudiant = profil.rangConcours;
        this.scoreEtudiant = profil.moyenneGenerale;
        this.matieres[0].note = profil.noteMaths;
        this.matieres[1].note = profil.notePhysique;
        this.matieres[2].note = profil.noteInformatique;
        this.matieres[3].note = profil.noteAnglais;
        this.matieres[4].note = profil.noteElectronique;
        this.matieres[5].note = profil.noteReseaux;
        this.infos[0].valeur = profil.prenom || "";
        this.infos[1].valeur = profil.nom || "";
      },
      error: () => console.log("Pas de profil existant")
    });
    this.loadRecommandations();
  }
  loadRecommandations() {
    this.http.get<any[]>(this.apiUrl + "/recommandations/" + this.etudiantId).subscribe({
      next: (data) => this.recommandations = data,
      error: (err) => console.error(err)
    });
  }
  calculerIA() {
    this.loading = true;
    const profil = {
      etudiantId: this.etudiantId,
      nom: this.infos[1].valeur,
      prenom: this.infos[0].valeur,
      moyenneGenerale: this.scoreEtudiant,
      noteMaths: this.matieres[0].note,
      notePhysique: this.matieres[1].note,
      noteInformatique: this.matieres[2].note,
      noteAnglais: this.matieres[3].note,
      noteElectronique: this.matieres[4].note,
      noteReseaux: this.matieres[5].note,
      rangConcours: this.rangEtudiant
    };
    this.http.post<any[]>(this.apiUrl + "/recommandations/calculer", profil).subscribe({
      next: (data) => { this.recommandations = data; this.loading = false; },
      error: (err) => { console.error(err); this.loading = false; }
    });
  }
  ouvrirEditionInfos() { this.infosTemp = this.infos.map(i => ({ ...i })); this.showInfosModal = true; }
  fermerInfosModal() { this.showInfosModal = false; }
  validerInfos() { this.infos = [...this.infosTemp]; this.showInfosModal = false; }
  ouvrirEditionScore() { this.formScoreValue = this.scoreEtudiant; this.showScoreModal = true; }
  fermerScoreModal() { this.showScoreModal = false; }
  validerScore() { this.scoreEtudiant = this.formScoreValue; this.showScoreModal = false; }
  ouvrirEditionRang() { this.formRangValue = this.rangEtudiant; this.showRangModal = true; }
  fermerRangModal() { this.showRangModal = false; }
  validerRang() { this.rangEtudiant = this.formRangValue; this.showRangModal = false; }
  ouvrirSaisie(m: any) {
    this.matiereSelectionnee = m;
    this.formNote = m.note;
    this.formError = "";
    this.showModal = true;
  }
  fermerModal() { this.showModal = false; this.matiereSelectionnee = null; }
  enregistrerNote() {
    if (this.formNote === null || isNaN(Number(this.formNote))) { this.formError = "Note invalide."; return; }
    if (Number(this.formNote) < 0 || Number(this.formNote) > 20) { this.formError = "Entre 0 et 20."; return; }
    this.matiereSelectionnee.note = Number(this.formNote);
    this.fermerModal();
  }
  supprimerNote(m: any) { m.note = null; }
}
