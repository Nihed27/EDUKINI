export interface Student {
  id: number;
  numeroInscription: string;
  nom: string;
  prenom: string;
  rang: number | null;
  score: number;
  specialiteSouhaitee: string;
  typeConcours: 'prepa' | 'specifique';
  filierePrepa: string;
}