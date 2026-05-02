import { Injectable } from '@angular/core';
import { Ecole } from './ecole.model';

@Injectable({
  providedIn: 'root'
})
export class EcoleService {

  private ecoles: Ecole[] = [
    {
      id: 1,
      nom: "Ecole Nationale d'Ingénieurs de Tunis",
      sigle: 'ENIT',
      universite: 'Université de Tunis El Manar',
      region: 'Tunis',
      adresse: 'BP 37, Le Belvédère, 1002 Tunis',
      filieres: [
        'Génie Electrique', 'Génie Mécanique', 'Génie Industriel', 'Génie Civil',
        "Modélisation pour l'Industrie et Services", 'Génie Hydraulique et Environnement',
        'Techniques Avancées', 'Télécommunications', 'Informatique'
      ]
    },
    {
      id: 2,
      nom: 'Ecole Polytechnique de Tunisie',
      sigle: 'EPT',
      universite: 'Université de Carthage',
      region: 'Ben Arous',
      adresse: 'Rue El Khawarizmi, BP 743, 2078 La Marsa',
      filieres: ['Mécanique et structure', 'Signaux et systémes', 'Economie et Gestion scientifique']
    }
  ];

  private nextId = 3;

  getAll(): Ecole[] {
    return [...this.ecoles];
  }

  getById(id: number): Ecole | undefined {
    return this.ecoles.find((e) => e.id === id);
  }

  add(ecole: Omit<Ecole, 'id'>): Ecole {
    const newEcole: Ecole = { ...ecole, id: this.nextId++ };
    this.ecoles.push(newEcole);
    return newEcole;
  }

  update(id: number, data: Omit<Ecole, 'id'>): Ecole | null {
    const index = this.ecoles.findIndex((e) => e.id === id);
    if (index === -1) return null;
    this.ecoles[index] = { id, ...data };
    return this.ecoles[index];
  }

  delete(id: number): boolean {
    const index = this.ecoles.findIndex((e) => e.id === id);
    if (index === -1) return false;
    this.ecoles.splice(index, 1);
    return true;
  }

  search(term: string, region: string, filiere: string): Ecole[] {
    return this.ecoles.filter((e) => {
      const matchTerm =
        !term.trim() ||
        e.nom.toLowerCase().includes(term.toLowerCase()) ||
        e.sigle.toLowerCase().includes(term.toLowerCase()) ||
        e.universite.toLowerCase().includes(term.toLowerCase());
      const matchRegion = !region || e.region === region;
      const matchFiliere =
        !filiere || e.filieres.some((f) => f.toLowerCase().includes(filiere.toLowerCase()));
      return matchTerm && matchRegion && matchFiliere;
    });
  }

  getRegions(): string[] {
    return [...new Set(this.ecoles.map((e) => e.region))].sort();
  }

  getUniversites(): string[] {
    return [...new Set(this.ecoles.map((e) => e.universite))].sort();
  }

  getAllFilieres(): string[] {
    const all = this.ecoles.flatMap((e) => e.filieres);
    return [...new Set(all)].sort();
  }
}