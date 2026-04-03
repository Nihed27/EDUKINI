import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

export interface Specialite {
  id: number;
  nom: string;
  code: string;
  icon: string;
  filiereId: number;
  filiereNom: string;
  filiereCouleur: string;
  filiereCouleurBg: string;
  description: string;
  debouches: string[];
  competences: string[];
  capacite: number;
  nbEtudiants: number;
  actif: boolean;
  annee: string;
}

@Component({
  selector: 'app-specialites',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './specialites.component.html',
  styleUrls: ['./specialites.component.css']
})
export class SpecialitesComponent implements OnInit {

  searchQuery = '';
  filterFiliere = 'toutes';
  filterActif = 'tous';

  filieres = [
    { id: 1, nom: 'Génie Informatique',            code: 'GI',    couleur: '#1a73e8', couleurBg: '#eff6ff' },
    { id: 2, nom: 'Génie Mécatronique',            code: 'GM',    couleur: '#0ea5e9', couleurBg: '#f0f9ff' },
    { id: 3, nom: 'Génie Industriel & Logistique', code: 'GIL',   couleur: '#f59e0b', couleurBg: '#fffbeb' },
    { id: 4, nom: 'Génie Infotronique',            code: 'GINFO', couleur: '#8b5cf6', couleurBg: '#f5f3ff' },
  ];

  specialites: Specialite[] = [
    // GI
    {
      id: 1, nom: 'Intelligence Artificielle', code: 'IA', icon: '🧠',
      filiereId: 1, filiereNom: 'Génie Informatique', filiereCouleur: '#1a73e8', filiereCouleurBg: '#eff6ff',
      description: 'Apprentissage automatique, deep learning, traitement du langage naturel et vision par ordinateur.',
      debouches: ['Data Scientist', 'ML Engineer', 'Chercheur IA', 'Ingénieur NLP'],
      competences: ['Machine Learning', 'Deep Learning', 'Python', 'TensorFlow'],
      capacite: 30, nbEtudiants: 26, actif: true, annee: '3ème année'
    },
    {
      id: 2, nom: 'Cybersécurité', code: 'CS', icon: '🔐',
      filiereId: 1, filiereNom: 'Génie Informatique', filiereCouleur: '#1a73e8', filiereCouleurBg: '#eff6ff',
      description: 'Sécurité des systèmes d\'information, cryptographie, tests de pénétration et gestion des risques.',
      debouches: ['Expert cybersécurité', 'Pentester', 'RSSI', 'Analyste SOC'],
      competences: ['Cryptographie', 'Pentesting', 'Forensics', 'Sécurité réseau'],
      capacite: 30, nbEtudiants: 24, actif: true, annee: '3ème année'
    },
    {
      id: 3, nom: 'Réseaux & Systèmes', code: 'RS', icon: '🌐',
      filiereId: 1, filiereNom: 'Génie Informatique', filiereCouleur: '#1a73e8', filiereCouleurBg: '#eff6ff',
      description: 'Administration de réseaux, cloud computing, virtualisation et gestion des systèmes distribués.',
      debouches: ['Ingénieur réseaux', 'Administrateur systèmes', 'Architecte cloud', 'DevOps'],
      competences: ['Linux', 'Cloud AWS/Azure', 'Docker', 'Kubernetes'],
      capacite: 30, nbEtudiants: 25, actif: true, annee: '3ème année'
    },
    {
      id: 4, nom: 'Génie Logiciel', code: 'GL', icon: '💻',
      filiereId: 1, filiereNom: 'Génie Informatique', filiereCouleur: '#1a73e8', filiereCouleurBg: '#eff6ff',
      description: 'Développement d\'applications web, mobile et logiciels avec les meilleures pratiques d\'ingénierie.',
      debouches: ['Développeur fullstack', 'Architecte logiciel', 'Lead dev', 'CTO startup'],
      competences: ['Angular', 'Spring Boot', 'React', 'Microservices'],
      capacite: 30, nbEtudiants: 23, actif: true, annee: '3ème année'
    },
    // GM
    {
      id: 5, nom: 'Robotique', code: 'ROB', icon: '🤖',
      filiereId: 2, filiereNom: 'Génie Mécatronique', filiereCouleur: '#0ea5e9', filiereCouleurBg: '#f0f9ff',
      description: 'Conception, programmation et contrôle de robots industriels et collaboratifs.',
      debouches: ['Ingénieur robotique', 'Intégrateur robots', 'R&D automation', 'Ingénieur cobot'],
      competences: ['ROS', 'Programmation robots', 'Vision artificielle', 'Contrôle'],
      capacite: 25, nbEtudiants: 22, actif: true, annee: '3ème année'
    },
    {
      id: 6, nom: 'Automatique', code: 'AUTO', icon: '⚡',
      filiereId: 2, filiereNom: 'Génie Mécatronique', filiereCouleur: '#0ea5e9', filiereCouleurBg: '#f0f9ff',
      description: 'Systèmes de commande automatique, régulation et contrôle des processus industriels.',
      debouches: ['Ingénieur automaticien', 'Chef de projet automatisation', 'Ingénieur process'],
      competences: ['MATLAB/Simulink', 'Asservissement', 'PLC/SCADA', 'Régulation'],
      capacite: 25, nbEtudiants: 20, actif: true, annee: '3ème année'
    },
    {
      id: 7, nom: 'Systèmes embarqués', code: 'SE', icon: '🔌',
      filiereId: 2, filiereNom: 'Génie Mécatronique', filiereCouleur: '#0ea5e9', filiereCouleurBg: '#f0f9ff',
      description: 'Conception de systèmes embarqués temps réel pour l\'automobile, l\'aéronautique et l\'IoT.',
      debouches: ['Ingénieur embarqué', 'Développeur firmware', 'Ingénieur automotive'],
      competences: ['C/C++ embarqué', 'RTOS', 'ARM Cortex', 'CAN/LIN/SPI'],
      capacite: 25, nbEtudiants: 21, actif: true, annee: '3ème année'
    },
    {
      id: 8, nom: 'Électronique industrielle', code: 'EI', icon: '🛠️',
      filiereId: 2, filiereNom: 'Génie Mécatronique', filiereCouleur: '#0ea5e9', filiereCouleurBg: '#f0f9ff',
      description: 'Conception de circuits électroniques de puissance et systèmes de conversion d\'énergie.',
      debouches: ['Ingénieur électronique', 'Concepteur PCB', 'Ingénieur puissance'],
      competences: ['Électronique de puissance', 'CAO PCB', 'FPGA', 'Altium Designer'],
      capacite: 25, nbEtudiants: 22, actif: true, annee: '3ème année'
    },
    // GIL
    {
      id: 9, nom: 'Logistique & Supply Chain', code: 'LSC', icon: '📦',
      filiereId: 3, filiereNom: 'Génie Industriel & Logistique', filiereCouleur: '#f59e0b', filiereCouleurBg: '#fffbeb',
      description: 'Gestion des flux, optimisation des chaînes d\'approvisionnement et opérations logistiques.',
      debouches: ['Responsable logistique', 'Consultant Supply Chain', 'Directeur logistique'],
      competences: ['SAP', 'Lean Supply Chain', 'S&OP', 'Transport management'],
      capacite: 22, nbEtudiants: 19, actif: true, annee: '3ème année'
    },
    {
      id: 10, nom: 'Gestion de production', code: 'GP', icon: '🏭',
      filiereId: 3, filiereNom: 'Génie Industriel & Logistique', filiereCouleur: '#f59e0b', filiereCouleurBg: '#fffbeb',
      description: 'Planification et pilotage de la production industrielle, amélioration des performances.',
      debouches: ['Ingénieur production', 'Chef d\'atelier', 'Responsable planning'],
      competences: ['MES/ERP', 'Lean Manufacturing', 'GPAO', 'Six Sigma'],
      capacite: 22, nbEtudiants: 20, actif: true, annee: '3ème année'
    },
    {
      id: 11, nom: 'Optimisation des systèmes', code: 'OS', icon: '📊',
      filiereId: 3, filiereNom: 'Génie Industriel & Logistique', filiereCouleur: '#f59e0b', filiereCouleurBg: '#fffbeb',
      description: 'Recherche opérationnelle, modélisation et optimisation des systèmes industriels complexes.',
      debouches: ['Ingénieur optimisation', 'Data analyst industriel', 'Consultant performance'],
      competences: ['Recherche opérationnelle', 'Simulation', 'Python/R', 'Méta-heuristiques'],
      capacite: 22, nbEtudiants: 18, actif: true, annee: '3ème année'
    },
    {
      id: 12, nom: 'Management industriel', code: 'MI', icon: '📈',
      filiereId: 3, filiereNom: 'Génie Industriel & Logistique', filiereCouleur: '#f59e0b', filiereCouleurBg: '#fffbeb',
      description: 'Pilotage de projets industriels, management des équipes et excellence opérationnelle.',
      debouches: ['Chef de projet industriel', 'Responsable qualité', 'Directeur industriel'],
      competences: ['Gestion de projet', 'ISO 9001', 'AMDEC', 'Leadership'],
      capacite: 22, nbEtudiants: 19, actif: true, annee: '3ème année'
    },
    // GINFO
    {
      id: 13, nom: 'Télécommunications', code: 'TELEC', icon: '📡',
      filiereId: 4, filiereNom: 'Génie Infotronique', filiereCouleur: '#8b5cf6', filiereCouleurBg: '#f5f3ff',
      description: 'Systèmes de communication sans fil, réseaux mobiles 4G/5G et architectures télécoms.',
      debouches: ['Ingénieur télécoms', 'Planificateur réseau', 'Ingénieur 5G'],
      competences: ['5G/LTE', 'Propagation radio', 'MIMO', 'Protocoles télécom'],
      capacite: 20, nbEtudiants: 17, actif: true, annee: '3ème année'
    },
    {
      id: 14, nom: 'Réseaux de communication', code: 'RC', icon: '📶',
      filiereId: 4, filiereNom: 'Génie Infotronique', filiereCouleur: '#8b5cf6', filiereCouleurBg: '#f5f3ff',
      description: 'Architecture et administration des réseaux haut débit, fibre optique et infrastructures d\'entreprise.',
      debouches: ['Ingénieur réseaux télécom', 'Architecte réseau', 'Expert VoIP'],
      competences: ['MPLS/SD-WAN', 'Fibre optique', 'BGP/OSPF', 'QoS'],
      capacite: 20, nbEtudiants: 18, actif: true, annee: '3ème année'
    },
    {
      id: 15, nom: 'Traitement du signal', code: 'TS', icon: '🎧',
      filiereId: 4, filiereNom: 'Génie Infotronique', filiereCouleur: '#8b5cf6', filiereCouleurBg: '#f5f3ff',
      description: 'Analyse et traitement des signaux numériques pour des applications audio, image et biomédicales.',
      debouches: ['Ingénieur signal', 'Chercheur traitement image', 'Spécialiste biomédical'],
      competences: ['DSP', 'MATLAB', 'Traitement image', 'Analyse fréquentielle'],
      capacite: 20, nbEtudiants: 16, actif: true, annee: '3ème année'
    },
    {
      id: 16, nom: 'Systèmes électroniques', code: 'SYS-E', icon: '🔬',
      filiereId: 4, filiereNom: 'Génie Infotronique', filiereCouleur: '#8b5cf6', filiereCouleurBg: '#f5f3ff',
      description: 'Conception de systèmes électroniques mixtes pour l\'instrumentation et la mesure.',
      debouches: ['Ingénieur électronique', 'Concepteur systèmes mixtes', 'Ingénieur instrumentation'],
      competences: ['Électronique analogique', 'VHDL/FPGA', 'Microcontrôleurs', 'Instrumentation'],
      capacite: 20, nbEtudiants: 16, actif: true, annee: '3ème année'
    },
  ];

  showModal         = false;
  showDeleteConfirm = false;
  showDetailModal   = false;
  editingSpec       : Specialite | null = null;
  deletingSpec      : Specialite | null = null;
  selectedSpec      : Specialite | null = null;
  specForm!         : FormGroup;
  newDebouche       = '';
  newCompetence     = '';
  debouchesList     : string[] = [];
  competencesList   : string[] = [];
  successMessage    = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void { this.initForm(); }

  initForm(): void {
    this.specForm = this.fb.group({
      nom        : ['', Validators.required],
      code       : ['', Validators.required],
      icon       : ['🎓'],
      filiereId  : ['', Validators.required],
      description: ['', Validators.required],
      capacite   : [30, [Validators.required, Validators.min(1)]],
      annee      : ['3ème année'],
      actif      : [true],
    });
  }

  /* ---- Filtres ---- */
  get specsFiltrees(): Specialite[] {
    return this.specialites.filter(s => {
      const q = s.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
             || s.code.toLowerCase().includes(this.searchQuery.toLowerCase())
             || s.filiereNom.toLowerCase().includes(this.searchQuery.toLowerCase());
      const f = this.filterFiliere === 'toutes' || s.filiereId === +this.filterFiliere;
      const a = this.filterActif === 'tous'
             || (this.filterActif === 'actif'   &&  s.actif)
             || (this.filterActif === 'inactif' && !s.actif);
      return q && f && a;
    });
  }

  get specsByFiliere(): { filiere: any; specs: Specialite[] }[] {
    return this.filieres
      .map(f => ({ filiere: f, specs: this.specsFiltrees.filter(s => s.filiereId === f.id) }))
      .filter(g => g.specs.length > 0);
  }

  /* ---- Stats ---- */
  get totalEtudiants(): number { return this.specialites.reduce((s, sp) => s + sp.nbEtudiants, 0); }
  get nbActives()     : number { return this.specialites.filter(s => s.actif).length; }

  getTaux(s: Specialite): number { return Math.round((s.nbEtudiants / s.capacite) * 100); }
  getFiliereById(id: number) { return this.filieres.find(f => f.id === id); }

  /* ---- Modal ajouter/modifier ---- */
  openModal(spec?: Specialite): void {
    this.editingSpec     = spec || null;
    this.debouchesList   = spec ? [...spec.debouches]   : [];
    this.competencesList = spec ? [...spec.competences] : [];
    this.newDebouche = ''; this.newCompetence = '';
    spec
      ? this.specForm.patchValue({ ...spec })
      : this.specForm.reset({ icon: '🎓', actif: true, capacite: 30, annee: '3ème année' });
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.editingSpec = null; }

  saveSpec(): void {
    if (this.specForm.invalid) return;
    const val     = this.specForm.value;
    const filiere = this.getFiliereById(+val.filiereId);
    if (!filiere) return;

    if (this.editingSpec) {
      const idx = this.specialites.findIndex(s => s.id === this.editingSpec!.id);
      this.specialites[idx] = {
        ...this.editingSpec, ...val,
        filiereNom: filiere.nom, filiereCouleur: filiere.couleur, filiereCouleurBg: filiere.couleurBg,
        debouches: [...this.debouchesList], competences: [...this.competencesList]
      };
      this.showSuccess('Spécialité modifiée avec succès.');
    } else {
      this.specialites.push({
        id: Date.now(), ...val,
        filiereNom: filiere.nom, filiereCouleur: filiere.couleur, filiereCouleurBg: filiere.couleurBg,
        debouches: [...this.debouchesList], competences: [...this.competencesList],
        nbEtudiants: 0
      });
      this.showSuccess('Spécialité ajoutée avec succès.');
    }
    this.closeModal();
  }

  /* ---- Débouchés & Compétences ---- */
  addDebouche()              : void { if (this.newDebouche.trim())   { this.debouchesList.push(this.newDebouche.trim());    this.newDebouche = '';    } }
  removeDebouche(i: number)  : void { this.debouchesList.splice(i, 1); }
  addCompetence()            : void { if (this.newCompetence.trim()) { this.competencesList.push(this.newCompetence.trim()); this.newCompetence = ''; } }
  removeCompetence(i: number): void { this.competencesList.splice(i, 1); }

  /* ---- Suppression ---- */
  confirmDelete(s: Specialite): void { this.deletingSpec = s; this.showDeleteConfirm = true; }
  cancelDelete()              : void { this.showDeleteConfirm = false; this.deletingSpec = null; }
  executeDelete()             : void {
    if (!this.deletingSpec) return;
    this.specialites = this.specialites.filter(s => s.id !== this.deletingSpec!.id);
    this.showSuccess(`Spécialité "${this.deletingSpec.nom}" supprimée.`);
    this.showDeleteConfirm = false; this.deletingSpec = null;
  }

  /* ---- Détail ---- */
  openDetail (s: Specialite): void { this.selectedSpec = s; this.showDetailModal = true; }
  closeDetail()             : void { this.showDetailModal = false; this.selectedSpec = null; }

  showSuccess(msg: string): void {
    this.successMessage = msg;
    setTimeout(() => this.successMessage = '', 4000);
  }
}