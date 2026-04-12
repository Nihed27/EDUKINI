import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mes-ecoles',
  imports: [CommonModule],
  templateUrl: './mes-ecoles.component.html',
  styleUrl: './mes-ecoles.component.css'
})
export class MesEcolesComponent {
  ecoles = [
    { sigle: 'ENIT',     nom: "École Nationale d'Ingénieurs de Tunis",         ville: 'Tunis',    description: "Leader en formation d'ingénieurs en Tunisie depuis 1968" },
    { sigle: 'ENIS',     nom: "École Nationale d'Ingénieurs de Sfax",           ville: 'Sfax',     description: 'Excellence en ingénierie industrielle et technologique' },
    { sigle: 'ENISO',    nom: "École Nationale d'Ingénieurs de Sousse",         ville: 'Sousse',   description: 'Innovation et technologie au cœur du Sahel' },
    { sigle: 'ENSIT',    nom: "École Nationale des Sciences de l'Informatique", ville: 'Tunis',    description: "Spécialiste des technologies de l'information" },
    { sigle: 'Polytech', nom: "École Polytechnique de Tunisie",                 ville: 'Tunis',    description: "Formation d'élite en ingénierie et sciences" },
    { sigle: "SUP'COM",  nom: "École Supérieure des Communications",            ville: 'Tunis',    description: 'Référence en télécommunications et numérique' },
    { sigle: 'INSAT',    nom: "Institut National des Sciences Appliquées",      ville: 'Tunis',    description: 'Sciences appliquées et technologies avancées' },
    { sigle: 'ENIM',     nom: "École Nationale d'Ingénieurs de Monastir",       ville: 'Monastir', description: 'Ingénierie mécanique et industrielle' },
  ];
}