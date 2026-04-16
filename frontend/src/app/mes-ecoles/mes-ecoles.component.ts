import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Ecole {
  sigle: string;
  nom: string;
  ville: string;
  description: string;
  fondation: number;
  universite: string;
  site: string;
  siteUrl: string;
  campus: string;
  lat: number;
  lng: number;
  langues: string[];
  specs: string[];
  note: string;
  accreditation?: string;
  directeur?: string;
}

@Component({
  selector: 'app-mes-ecoles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mes-ecoles.component.html',
  styleUrl: './mes-ecoles.component.css'
})
export class MesEcolesComponent {
  selectedEcole: Ecole | null = null;

  openModal(ecole: Ecole): void {
    this.selectedEcole = ecole;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.selectedEcole = null;
    document.body.style.overflow = '';
  }

  getMapsUrl(e: Ecole): string {
    return `https://www.google.com/maps/search/?api=1&query=${e.lat},${e.lng}`;
  }

  getLanguesStr(langues: string[]): string {
    return langues.join(', ');
  }

  ecoles: Ecole[] = [
    {
      sigle: 'ENIT',
      nom: "École Nationale d'Ingénieurs de Tunis",
      ville: 'Tunis',
      description: "Leader en formation d'ingénieurs en Tunisie depuis 1968",
      fondation: 1968,
      universite: "Université de Tunis – El Manar",
      site: "www.enit.rnu.tn",
      siteUrl: "https://www.enit.rnu.tn",
      campus: "Campus El Manar, Tunis",
      lat: 36.8415,
      lng: 10.1636,
      langues: ["Arabe", "Français", "Anglais"],
      accreditation: "EUR-ACE Master (2017, 6 ans)",
      specs: [
        "Génie civil",
        "Génie électrique",
        "Génie industriel",
        "Génie mécanique",
        "Informatique & Télécoms",
        "Techniques avancées",
        "Hydraulique & Environnement",
        "Modélisation industrielle"
      ],
      note: "Plus ancienne école d'ingénieurs de Tunisie, fondée officiellement le 31 décembre 1968 par Mokhtar Latiri. Dépend de l'université de Tunis – El Manar. Plus de 1 400 étudiants en cycle ingénieur et autant en 3e cycle. Corps professoral de plus de 220 enseignants. Accréditation EUR-ACE Master obtenue en 2017 pour 6 ans."
    },
    {
      sigle: 'ENIS',
      nom: "École Nationale d'Ingénieurs de Sfax",
      ville: 'Sfax',
      description: "Excellence en ingénierie industrielle et technologique",
      fondation: 1983,
      universite: "Université de Sfax",
      site: "www.enis.rnu.tn",
      siteUrl: "https://www.enis.rnu.tn",
      campus: "Campus Université de Sfax",
      lat: 34.7406,
      lng: 10.7603,
      langues: ["Arabe", "Français", "Anglais"],
      specs: [
        "Génie biologique",
        "Génie civil",
        "Génie électrique",
        "Génie informatique & Maths appliquées",
        "Génie géologique",
        "Génie des matériaux & Management industriel",
        "Génie mécanique"
      ],
      note: "Créée en 1983 par transformation de la faculté des sciences et techniques de Sfax (fondée en 1975). Joue un rôle majeur dans le développement du pôle scientifique régional de Sfax. Offre des formations de master professionnel, masters de recherche et formations doctorales."
    },
    {
      sigle: 'ENISo',
      nom: "École Nationale d'Ingénieurs de Sousse",
      ville: 'Sousse',
      description: "Innovation et technologie au cœur du Sahel",
      fondation: 2005,
      universite: "Université de Sousse",
      site: "www.eniso.rnu.tn",
      siteUrl: "https://www.eniso.rnu.tn",
      campus: "Technopole de Sousse (depuis 2011)",
      lat: 35.8245,
      lng: 10.6346,
      langues: ["Arabe", "Français", "Anglais"],
      directeur: "Ali Douik",
      specs: [
        "Génie informatique appliqué à l'industrie",
        "Génie mécatronique",
        "Génie électronique industriel"
      ],
      note: "Fondée en juillet 2005, d'abord logée avenue du 18-Janvier à Sousse avant de s'installer à la technopole de Sousse en 2011. La filière mécatronique propose deux options en 3e année : Conception des systèmes mécatroniques et Aérotechnique. Offre des masters de recherche et un master professionnel."
    },
    {
      sigle: 'ENSI',
      nom: "École Nationale des Sciences de l'Informatique",
      ville: 'La Manouba',
      description: "Spécialiste des technologies de l'information",
      fondation: 1984,
      universite: "Université de La Manouba",
      site: "ensi.rnu.tn",
      siteUrl: "https://ensi.rnu.tn",
      campus: "Campus de La Manouba",
      lat: 36.8103,
      lng: 10.0661,
      langues: ["Arabe", "Français", "Anglais"],
      directeur: "Pr Anja Habacha Chaibi",
      specs: [
        "Ingénierie pour l'image",
        "Ingénierie logicielle & Systèmes d'information",
        "Ingénierie pour la finance",
        "Systèmes intelligents & Décision",
        "Réseaux & Systèmes répartis",
        "Systèmes & Logiciels embarqués"
      ],
      note: "Fondée en septembre 1984 par Habib Bourguiba Jr. et le Pr Mohamed Ben Ahmed. Formation de 2 700h incluant cours, TP, projets et stages. Tronc commun de 3 semestres puis spécialisation sur 2 semestres. Stage obligatoire de 4 mois en fin d'études, plus deux stages de 6 semaines chacun."
    },
    {
      sigle: 'EPT',
      nom: "École Polytechnique de Tunisie",
      ville: 'La Marsa',
      description: "Formation d'élite en ingénierie et sciences",
      fondation: 1994,
      universite: "Université de Carthage",
      site: "www.ept.rnu.tn",
      siteUrl: "https://www.ept.rnu.tn",
      campus: "La Marsa (depuis 1997)",
      lat: 36.8878,
      lng: 10.3247,
      langues: ["Français", "Anglais"],
      directeur: "Lilia Amraoui",
      specs: [
        "Formation polyvalente et pluridisciplinaire",
        "Sciences fondamentales",
        "Sciences humaines & sociales",
        "Langues et communication",
        "Environnement socio-économique international"
      ],
      note: "Créée par la loi n°91-42 du 26 juin 1991, rattachée à l'Université de Carthage. Premiers cours à Sidi Bou Saïd en septembre 1994, installation à La Marsa en 1997. 153 élèves-ingénieurs en 2010-2011. 648 ingénieurs diplômés en 14 promotions entre 1997 et 2010."
    },
    {
      sigle: "SUP'COM",
      nom: "École Supérieure des Communications de Tunis",
      ville: 'Ariana',
      description: "Référence en télécommunications et numérique",
      fondation: 1998,
      universite: "Université de Carthage",
      site: "www.supcom.tn",
      siteUrl: "https://www.supcom.tn",
      campus: "Cité Technologique El Ghazala, Ariana",
      lat: 36.8917,
      lng: 10.1861,
      langues: ["Français", "Anglais"],
      specs: [
        "Réseaux & Télécommunications",
        "Systèmes embarqués",
        "Intelligence artificielle",
        "Sécurité informatique",
        "Traitement du signal & Image"
      ],
      note: "Leader en formation d'ingénieurs en TIC en Tunisie. Localisée dans le parc technologique El Ghazala à Ariana, au cœur de l'écosystème numérique tunisien. Offre des formations en ingénierie des TIC de haut niveau avec des partenariats internationaux."
    },
    {
      sigle: 'ENICarthage',
      nom: "École Nationale d'Ingénieurs de Carthage",
      ville: 'Ariana',
      description: "Technologies de l'ingénierie et systèmes avancés",
      fondation: 2002,
      universite: "Université de Carthage",
      site: "www.enicarthage.rnu.tn",
      siteUrl: "https://www.enicarthage.rnu.tn",
      campus: "Charguia II, Ariana",
      lat: 36.8543,
      lng: 10.1974,
      langues: ["Français", "Anglais"],
      directeur: "Prof. Hassen Zairi",
      specs: [
        "Génie informatique",
        "Génie mécatronique",
        "Génie des systèmes industriels & logistiques",
        "Génie des systèmes infotronique"
      ],
      note: "Créée le 9 juillet 2002 par le décret n°2002-1623, à l'initiative du Pr Abdelhamid Ben Youssef, sous le nom initial d'École Supérieure de Technologie et d'Informatique (ESTI). 2 239 étudiants en 2010-2011. Offre des diplômes de master et d'ingénieur avec une dominante fondamentale en 1er cycle et appliquée en 2e cycle."
    },
    {
      sigle: 'ENIM',
      nom: "École Nationale d'Ingénieurs de Monastir",
      ville: 'Monastir',
      description: "Ingénierie mécanique et industrielle",
      fondation: 1987,
      universite: "Université de Monastir",
      site: "www.enim.rnu.tn",
      siteUrl: "https://www.enim.rnu.tn",
      campus: "Monastir",
      lat: 35.7643,
      lng: 10.8113,
      langues: ["Arabe", "Français", "Anglais"],
      specs: [
        "Génie énergétique",
        "Génie mécanique",
        "Génie électrique",
        "Génie textile"
      ],
      note: "Créée en 1987. Coopérations avec l'École centrale de Marseille (projets de fin d'études) et échange d'étudiants avec l'ENIM Metz et l'École polytechnique universitaire de Lorraine. Membre du réseau francophone des écoles textiles : ENSAIT (France), ESITH (Maroc), ENIT (Tunisie)."
    }
  ];
}