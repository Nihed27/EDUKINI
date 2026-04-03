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
        'Modélisation pour l\'Industrie et Services', 'Génie Hydraulique et Environnement',
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
      filieres: ['Mécanique et structure','Signaux et systémes','Economie et Gestion scientifique']
    },
    {
      id: 3,
      nom: "Ecole Nationale d'Ingénieurs de Bizerte",
      sigle: 'ENIB',
      universite: 'Université de Carthage',
      region: 'Bizerte',
      adresse: 'BP 66, 7021 Zarzouna, Bizerte',
      filieres: [
        'Génie Industriel', 'Génie Mécanique', 'Génie Civil', 'Electronique Industrielle'
      ]
    },
    {
      id: 4,
      nom: "Ecole Nationale d'Ingénieurs de Sousse",
      sigle: 'ENISO',
      universite: 'Université de Sousse',
      region: 'Sousse',
      adresse: 'Cité Erriadh, 4054 Sousse',
      filieres: [
        'Mécatronique', 'Informatique Appliquée', 'Génie Télécommunications Embarquées', 'Génie Productique'
      ]
    },
    {
      id: 5,
      nom: 'Ecole Supérieure des Industries Alimentaires de Tunis',
      sigle: 'ESIAT',
      universite: 'Université de Carthage',
      region: 'Tunis',
      adresse: '58 Avenue Alain Savary, 1003 Tunis',
      filieres: ['Agro-alimentaire']
    },
    {
      id: 6,
      nom: "Ecole Supérieure d'Ingénieurs de Mejez El Bab",
      sigle: 'EISi Mejez El Bab',
      universite: 'Université de Jendouba',
      region: 'Beja',
      adresse: 'Mejez El Bab, Béja',
      filieres: [
        'Génie Mécanique et Agro-Industriel', 'Hydraulique et Aménagement', 'Topographie et Géomatique'
      ]
    },
    {
      id: 7,
      nom: 'Institut Supérieur Agronomique de Chott-Mariem',
      sigle: 'ISACHM',
      universite: 'Université de Sousse',
      region: 'Sousse',
      adresse: 'Chott-Mariem, 4042 Sousse',
      filieres: [
        'Horticulture', 'Production Animale', 'Aménagement du Paysage', 'Génie des Systèmes Horticoles'
      ]
    },
    {
      id: 8,
      nom: 'Ecole Nationale des Sciences et Technologies Avancées de Borj Cedria',
      sigle: 'ENSTAB',
      universite: 'Université de Tunis El Manar',
      region: 'Ben Arous',
      adresse: 'Technopole de Borj Cedria, BP 95, 2050',
      filieres: ['Technologies Avancées']
    },
    {
      id: 9,
      nom: "Ecole Nationale d'Ingénieurs de Sfax",
      sigle: 'ENIS',
      universite: 'Université de Sfax',
      region: 'Sfax',
      adresse: 'Route Soukra km 4, BP 1173, 3038 Sfax',
      filieres: [
        'Génie Electrique', 'Génie Electromécanique', 'Génie des Matériaux et Management Industriel',
        'Génie Informatique', 'Génie Biologique', 'Géo Ressources et Environnement', 'Génie Civil'
      ]
    },
    {
      id: 10,
      nom: "Ecole Nationale Supérieure d'Ingénieurs de Tunis",
      sigle: 'ENSIT',
      universite: 'Université de Tunis',
      region: 'Tunis',
      adresse: '5 Avenue Taha Hussein, Montfleury, 1008 Tunis',
      filieres: ['Génie Electrique', 'Génie Mécanique', 'Génie Civil']
    },
    {
      id: 11,
      nom: "Ecole Nationale d'Ingénieurs de Monastir",
      sigle: 'ENIM',
      universite: 'Université de Monastir',
      region: 'Monastir',
      adresse: 'Avenue Ibn El Jazzar, 5019 Monastir',
      filieres: [
        'Génie Electrique', 'Génie Industriel',
        'Génie Mathématiques Appliquées et Modélisation',
        'Génie des Systèmes Industriels et Logistiques', 'Mécatronique',
        'Informatique', 'Infotronique'
      ]
    },
    {
      id: 12,
      nom: "Ecole Nationale d'Ingénieurs de Carthage",
      sigle: 'ENI-Carthage',
      universite: 'Université de Carthage',
      region: 'Tunis',
      adresse: '45 Rue des Entrepreneurs, 2035 Charguia II',
      filieres: [
        'Génie des Télécommunications', 'Génie des Systèmes Electroniques et Communications',
        'Génie Informatique Industrielle', 'Ingénierie des Données et Systèmes Décisionnels'
      ]
    },
    {
      id: 13,
      nom: "Ecole Nationale d'Electronique et des Télécommunications de Sfax",
      sigle: "ENET'Com",
      universite: 'Université de Sfax',
      region: 'Sfax',
      adresse: 'Route Soukra km 4, 3021 Sfax',
      filieres: ['Informatique']
    },
    {
      id: 14,
      nom: "Ecole Nationale des Sciences de l'Informatique",
      sigle: 'ENSI',
      universite: 'Université de la Manouba',
      region: 'Manouba',
      adresse: 'Campus Universitaire, 2010 Manouba',
      filieres: ['Informatique']
    },
    {
      id: 15,
      nom: "Ecole Supérieure de la Statistique et de l'Analyse de l'Information",
      sigle: 'ESSAI',
      universite: 'Université de Tunis El Manar',
      region: 'Tunis',
      adresse: 'Campus Universitaire El Manar, 2092 Tunis',
      filieres: ["Statistique et Analyse de l'Information"]
    },
    {
      id: 16,
      nom: 'Ecole Supérieure des Communications de Tunis',
      sigle: "SUP'COM",
      universite: 'Université de Carthage',
      region: 'Tunis',
      adresse: 'Route de Raoued km 3.5, 2083 Ghazala',
      filieres: ['Télécommunications']
    },
    {
      id: 17,
      nom: "Ecole Nationale d'Ingénieurs de Gabès",
      sigle: 'ENIG',
      universite: 'Université de Gabès',
      region: 'Gabès',
      adresse: 'Rue Omar Ibn El Khattab, 6029 Gabès',
      filieres: [
        'Génie Electrique - Automatique', 'Génie Mécanique', 'Génie Civil',
        'Génie Chimique - Procédés', 'Génie des Communications et Réseaux'
      ]
    },
    {
      id: 18,
      nom: 'Faculté des Sciences de Tunis',
      sigle: 'FST',
      universite: 'Université de Tunis El Manar',
      region: 'Tunis',
      adresse: 'Campus Universitaire El Manar, 2092 Tunis',
      filieres: [
        'Informatique', 'Chimie analytique et Instrumentation', 'Electronique',
        'Géosciences', 'Sciences de la Production Végétale', 'Phytiatrie'
      ]
    },
    {
      id: 19,
      nom: 'Institut National Agronomique de Tunisie',
      sigle: 'INAT',
      universite: 'Université de Carthage',
      region: 'Tunis',
      adresse: '43 Avenue Charles Nicolle, 1082 Tunis',
      filieres: [
        'Production Animale', 'Génie Rural, Eaux et Forêts',
        'Agro-alimentaire', 'Halieutique', 'Foresterie et Aménagement du Territoire'
      ]
    },
    {
      id: 20,
      nom: "Ecole Supérieure d'Agriculture de Mateur",
      sigle: 'ESAMateur',
      universite: 'Université de Carthage',
      region: 'Bizerte',
      adresse: 'Mateur, Bizerte',
      filieres: ['Production Animale et Fourragère']
    },
    {
      id: 21,
      nom: "Ecole Supérieure d'Agriculture de Mograne",
      sigle: 'ESAMograne',
      universite: 'Université de Zaghouan',
      region: 'Zaghouan',
      adresse: 'Mograne, Zaghouan',
      filieres: ['Economie Rurale', 'Production Agricole', 'Sciences Agricoles']
    },
    {
      id: 22,
      nom: "Ecole Supérieure d'Agriculture du Kef",
      sigle: 'ESAKef',
      universite: 'Université de Jendouba',
      region: 'Le Kef',
      adresse: 'Le Kef',
      filieres: ['Génie Chimique Industriel et Minier', "Technologies de l'Environnement"]
    },
    {
      id: 23,
      nom: "Ecole Nationale d'Ingénieurs de Gafsa",
      sigle: 'ENI-Gafsa',
      universite: 'Université de Gafsa',
      region: 'Gafsa',
      adresse: 'Sidi Ahmed Zarrouk, 2112 Gafsa',
      filieres: ['Génie Electromécanique']
    }
  ];

  private nextId = 24;

  getAll(): Ecole[] {
    return [...this.ecoles];
  }

  getById(id: number): Ecole | undefined {
    return this.ecoles.find(e => e.id === id);
  }

  add(ecole: Omit<Ecole, 'id'>): Ecole {
    const newEcole: Ecole = { ...ecole, id: this.nextId++ };
    this.ecoles.push(newEcole);
    return newEcole;
  }

  update(id: number, data: Omit<Ecole, 'id'>): Ecole | null {
    const index = this.ecoles.findIndex(e => e.id === id);
    if (index === -1) return null;
    this.ecoles[index] = { id, ...data };
    return this.ecoles[index];
  }

  delete(id: number): boolean {
    const index = this.ecoles.findIndex(e => e.id === id);
    if (index === -1) return false;
    this.ecoles.splice(index, 1);
    return true;
  }

  search(term: string, region: string, filiere: string): Ecole[] {
    return this.ecoles.filter(e => {
      const matchTerm = !term.trim() ||
        e.nom.toLowerCase().includes(term.toLowerCase()) ||
        e.sigle.toLowerCase().includes(term.toLowerCase()) ||
        e.universite.toLowerCase().includes(term.toLowerCase());
      const matchRegion = !region || e.region === region;
      const matchFiliere = !filiere ||
        e.filieres.some(f => f.toLowerCase().includes(filiere.toLowerCase()));
      return matchTerm && matchRegion && matchFiliere;
    });
  }

  getRegions(): string[] {
    return [...new Set(this.ecoles.map(e => e.region))].sort();
  }

  getUniversites(): string[] {
    return [...new Set(this.ecoles.map(e => e.universite))].sort();
  }

  getAllFilieres(): string[] {
    const all = this.ecoles.flatMap(e => e.filieres);
    return [...new Set(all)].sort();
  }
}