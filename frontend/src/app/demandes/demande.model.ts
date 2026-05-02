export interface Demande {
  id: number;
  numeroInscription: string;
  nomEtudiant: string;
  prenomEtudiant: string;
  typeDemande: string;
  dateDemande: string;
  statut: 'en_attente' | 'approuvee' | 'rejetee';
  commentaire: string;
}