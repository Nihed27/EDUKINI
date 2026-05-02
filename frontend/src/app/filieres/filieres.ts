import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router'; // ← même import que EtudiantsComponent

export interface Filiere {
  id: number;
  nom: string;
  code: string;
  icon: string;
  couleur: string;
  couleurBg: string;
  description: string;
  debouches: string[];
  competences: string[];
  capacite: number;
  duree: string;
  scoreMin: number;
  actif: boolean;
  nbEtudiants: number;
}

@Component({
  selector: 'app-filieres',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule], // ← RouterModule
  templateUrl: './filieres.html',
  styleUrls: ['./filieres.css']
})
export class FilieresComponent implements OnInit {

  viewMode: 'cards' | 'table' = 'cards';
  searchQuery: string = '';
  filterActif: string = 'tous';

  filieres: Filiere[] = [
    {
      id: 1,
      nom: 'Génie Informatique',
      code: 'GI',
      icon: '💻',
      couleur: '#1a73e8',
      couleurBg: '#eff6ff',
      description: 'Formation en développement logiciel, systèmes d\'information, intelligence artificielle et cybersécurité.',
      debouches: ['Ingénieur développeur', 'Architecte logiciel', 'Data Scientist', 'Expert cybersécurité'],
      competences: ['Algorithmique', 'Base de données', 'Développement web', 'Intelligence artificielle'],
      capacite: 120, duree: '3 ans', scoreMin: 75, actif: true, nbEtudiants: 98
    },
    {
      id: 2,
      nom: 'Génie Mécatronique',
      code: 'GM',
      icon: '⚙️',
      couleur: '#0ea5e9',
      couleurBg: '#f0f9ff',
      description: 'Intégration de la mécanique, électronique et informatique pour concevoir des systèmes automatisés intelligents.',
      debouches: ['Ingénieur robotique', 'Concepteur systèmes embarqués', 'Ingénieur automobile', 'R&D industriel'],
      competences: ['Mécanique', 'Électronique', 'Automatique', 'Systèmes embarqués'],
      capacite: 100, duree: '3 ans', scoreMin: 72, actif: true, nbEtudiants: 85
    },
    {
      id: 3,
      nom: 'Génie Industriel & Logistique',
      code: 'GIL',
      icon: '🏭',
      couleur: '#f59e0b',
      couleurBg: '#fffbeb',
      description: 'Optimisation des systèmes de production, gestion de la chaîne logistique et amélioration continue.',
      debouches: ['Ingénieur production', 'Responsable logistique', 'Chef de projet industriel', 'Consultant Supply Chain'],
      competences: ['Lean Management', 'Gestion de projet', 'Supply Chain', 'Qualité industrielle'],
      capacite: 90, duree: '3 ans', scoreMin: 68, actif: true, nbEtudiants: 76
    },
    {
      id: 4,
      nom: 'Génie Infotronique',
      code: 'GINFO',
      icon: '📡',
      couleur: '#8b5cf6',
      couleurBg: '#f5f3ff',
      description: 'Convergence de l\'informatique et de l\'électronique pour les systèmes de communication, IoT et traitement du signal.',
      debouches: ['Ingénieur télécom', 'Développeur IoT', 'Ingénieur réseaux', 'Expert traitement signal'],
      competences: ['Électronique numérique', 'Réseaux', 'IoT', 'Traitement du signal'],
      capacite: 80, duree: '3 ans', scoreMin: 70, actif: true, nbEtudiants: 67
    }
  ];

  showModal        = false;
  showDeleteConfirm= false;
  showDetailModal  = false;
  editingFiliere  : Filiere | null = null;
  deletingFiliere : Filiere | null = null;
  selectedFiliere : Filiere | null = null;
  filiereForm!    : FormGroup;
  newDebouche     = '';
  newCompetence   = '';
  debouchesList   : string[] = [];
  competencesList : string[] = [];
  successMessage  = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void { this.initForm(); }

  initForm(): void {
    this.filiereForm = this.fb.group({
      nom        : ['', Validators.required],
      code       : ['', Validators.required],
      icon       : ['🎓'],
      couleur    : ['#1a73e8'],
      description: ['', Validators.required],
      capacite   : [60,  [Validators.required, Validators.min(1)]],
      duree      : ['3 ans', Validators.required],
      scoreMin   : [60,  [Validators.required, Validators.min(0), Validators.max(100)]],
      actif      : [true],
    });
  }

  get filieresFiltrees(): Filiere[] {
    return this.filieres.filter(f => {
      const s = f.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
             || f.code.toLowerCase().includes(this.searchQuery.toLowerCase());
      const a = this.filterActif === 'tous'
             || (this.filterActif === 'actif'   &&  f.actif)
             || (this.filterActif === 'inactif' && !f.actif);
      return s && a;
    });
  }

  get totalEtudiants(): number { return this.filieres.reduce((s, f) => s + f.nbEtudiants, 0); }
  get totalCapacite() : number { return this.filieres.reduce((s, f) => s + f.capacite, 0); }

  getTauxRemplissage(f: Filiere): number {
    return Math.round((f.nbEtudiants / f.capacite) * 100);
  }

  openModal(filiere?: Filiere): void {
    this.editingFiliere  = filiere || null;
    this.debouchesList   = filiere ? [...filiere.debouches]   : [];
    this.competencesList = filiere ? [...filiere.competences] : [];
    this.newDebouche = ''; this.newCompetence = '';
    if (filiere) {
      this.filiereForm.patchValue({ ...filiere });
    } else {
      this.filiereForm.reset({ icon: '🎓', couleur: '#1a73e8', actif: true, capacite: 60, scoreMin: 60, duree: '3 ans' });
    }
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.editingFiliere = null; }

  saveFiliere(): void {
    if (this.filiereForm.invalid) return;
    const val = this.filiereForm.value;
    const bg  = this.hexToLightBg(val.couleur);
    if (this.editingFiliere) {
      const idx = this.filieres.findIndex(f => f.id === this.editingFiliere!.id);
      this.filieres[idx] = { ...this.editingFiliere, ...val, couleurBg: bg, debouches: [...this.debouchesList], competences: [...this.competencesList] };
      this.showSuccess('Filière modifiée avec succès.');
    } else {
      this.filieres.push({ id: Date.now(), ...val, couleurBg: bg, debouches: [...this.debouchesList], competences: [...this.competencesList], nbEtudiants: 0 });
      this.showSuccess('Filière ajoutée avec succès.');
    }
    this.closeModal();
  }

  addDebouche   (): void { if (this.newDebouche.trim())    { this.debouchesList.push(this.newDebouche.trim());       this.newDebouche    = ''; } }
  removeDebouche(i: number): void { this.debouchesList.splice(i, 1); }
  addCompetence (): void { if (this.newCompetence.trim())  { this.competencesList.push(this.newCompetence.trim());   this.newCompetence  = ''; } }
  removeCompetence(i: number): void { this.competencesList.splice(i, 1); }

  confirmDelete(f: Filiere): void { this.deletingFiliere = f; this.showDeleteConfirm = true; }
  cancelDelete  (): void { this.showDeleteConfirm = false; this.deletingFiliere = null; }
  executeDelete (): void {
    if (!this.deletingFiliere) return;
    this.filieres = this.filieres.filter(f => f.id !== this.deletingFiliere!.id);
    this.showSuccess(`Filière "${this.deletingFiliere.nom}" supprimée.`);
    this.showDeleteConfirm = false; this.deletingFiliere = null;
  }

  openDetail (f: Filiere): void { this.selectedFiliere = f; this.showDetailModal = true; }
  closeDetail(): void { this.showDetailModal = false; this.selectedFiliere = null; }
  toggleActif(f: Filiere): void { f.actif = !f.actif; }

  hexToLightBg(hex: string): string {
    const m: Record<string, string> = {
      '#1a73e8':'#eff6ff','#0ea5e9':'#f0f9ff','#f59e0b':'#fffbeb',
      '#8b5cf6':'#f5f3ff','#10b981':'#ecfdf5','#ef4444':'#fef2f2',
      '#f97316':'#fff7ed','#06b6d4':'#ecfeff',
    };
    return m[hex] || '#f9fafb';
  }

  showSuccess(msg: string): void {
    this.successMessage = msg;
    setTimeout(() => this.successMessage = '', 4000);
  }
}