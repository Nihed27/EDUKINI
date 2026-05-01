import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

export interface ProgrammeDetail {
  sigle: string;
  nom: string;
  type: 'Recherche' | 'Professionnel' | 'Doctorat';
  couleur: 'blue' | 'violet' | 'orange' | 'indigo';
  duree: string;
  intro: string;
  objectifs: string[];
  acces: string[];
  perspectives_pro: string[];
  perspectives_academiques: string[];
  competences: string[];
  partenaires: string[];
  modalite?: string[];
  stage?: string;
}

export const PROGRAMMES: { [key: string]: ProgrammeDetail } = {
  tic: {
    sigle: 'TIC', nom: 'Master TIC — Réseaux et Multimédia',
    type: 'Recherche', couleur: 'blue', duree: '2 ans (4 semestres)',
    intro: 'Le Master Recherche TIC de l\'ENICarthage forme des ingénieurs hautement qualifiés dans les domaines des réseaux informatiques, des systèmes multimédias et des technologies de l\'information et de la communication. Il prépare aux carrières de chercheur, enseignant-chercheur et expert technique.',
    objectifs: [
      'Acquérir une formation scientifique de haut niveau en réseaux et systèmes de communication',
      'Maîtriser les architectures réseau avancées, la sécurité et les protocoles multimédias',
      'Développer des compétences en recherche appliquée pour l\'innovation technologique',
      'Préparer à la poursuite en Doctorat ou à l\'intégration dans des équipes R&D',
    ],
    acces: [
      'Licence en Informatique, Réseaux ou Génie Logiciel',
      'Licence en Électronique ou Télécommunications',
      'Sélection sur dossier académique avec entretien de motivation',
      'Niveau d\'anglais requis pour la lecture de publications scientifiques',
    ],
    perspectives_pro: [
      'Ingénieur Réseaux & Sécurité',
      'Architecte Systèmes d\'Information',
      'Expert Multimédia & Streaming',
      'Chef de projet IT / DSI',
      'Ingénieur Cloud & Infrastructure',
    ],
    perspectives_academiques: [
      'Poursuite en Doctorat en Génie Électrique à ENICarthage',
      'Accès aux programmes de Doctorat nationaux et internationaux',
      'Carrière d\'enseignant-chercheur dans les universités tunisiennes',
    ],
    competences: [
      'Protocoles réseau (TCP/IP, BGP, OSPF)',
      'Sécurité & cryptographie',
      'Systèmes multimédias & streaming',
      'Cloud computing (AWS, Azure)',
      'Virtualisation & SDN',
      'Rédaction scientifique',
    ],
    partenaires: ['ENICarthage', 'Ministère de l\'Enseignement Supérieur'],
  },

  eea: {
    sigle: 'EEA', nom: 'Master ARTI/WESET — Automatique, Robotique & Wind Energy',
    type: 'Recherche', couleur: 'violet', duree: '2 ans (M1 + M2)',
    intro: 'Le Master LMD de Recherche EEA propose deux parcours au choix en deuxième année : ARTI (Automatique, Robotique et Traitement de l\'Information) et WESET (Wind Energy Sciences and Technologies). Ce Master forme des ingénieurs-chercheurs dans les domaines des systèmes électriques, de la robotique, de l\'automatique et des énergies renouvelables.',
    objectifs: [
      'Donner des bases solides en automatique, systèmes électriques, robotique, informatique industrielle et traitement du signal',
      'Permettre d\'appréhender les problèmes liés au développement des sciences et technologies de l\'information, sur le plan recherche et applications industrielles',
      'Fournir une formation scientifique de haut niveau équilibrée et une formation pratique pour l\'implémentation de systèmes complexes',
      'Initier les étudiants à la recherche dans les systèmes électriques, l\'automatique, la robotique et le traitement du signal (en M2)',
      'Former aux énergies éoliennes et à la transition énergétique (parcours WESET)',
    ],
    acces: [
      'Pour le M1 : être titulaire d\'une licence en EEA, Génie Électrique ou équivalent national ou international',
      'Pour le M2 ARTI ou WESET : avoir validé le M1 avec les prérequis nécessaires',
      'Ou avoir validé au moins deux années d\'études d\'ingénieurs en EEA, Génie Électrique ou équivalent',
      'Les résultats en automatique, systèmes électriques, électronique et informatique industrielle sont un critère important d\'admission en M2',
      'Des cours de consolidation en Mathématiques et Physique peuvent être organisés avant le M1',
    ],
    perspectives_pro: [
      'Ingénieur dans les technologies des énergies renouvelables, notamment les énergies éoliennes',
      'Ingénieur en technologies des systèmes embarqués et robotisés',
      'Expert en traitement de l\'information',
      'Ingénieur automaticien en industrie',
      'Consultant en transition énergétique',
    ],
    perspectives_academiques: [
      'La formation M1 est suffisamment généraliste pour permettre différentes orientations',
      'Accès à des M2 dont les spécialités relèvent du Génie Électrique ou du EEA au niveau national et international',
      'Le M2 (ARTI ou WESET) permet de poursuivre en Doctorat dans les domaines des systèmes électriques, de l\'informatique industrielle et du traitement de l\'information',
      'Poursuite en Doctorat en Génie Électrique à ENICarthage',
    ],
    competences: [
      'Automatique & systèmes de contrôle',
      'Robotique industrielle',
      'Traitement du signal et des images',
      'Systèmes embarqués',
      'Énergies éoliennes (WESET)',
      'Informatique industrielle',
      'MATLAB / Simulink',
    ],
    partenaires: ['ENICarthage', 'Laboratoires de recherche nationaux', 'École Doctorale STINGE'],
  },

  mpsdm: {
    sigle: 'SDM', nom: 'Mastère Professionnel MPSDM — Sciences des Données & Mobiquité',
    type: 'Professionnel', couleur: 'orange', duree: '2 semestres',
    intro: 'Le Mastère Professionnel co-construit en Sciences des Données et Mobiquité (MPSDM) est proposé conjointement par l\'ENICarthage, l\'Université Virtuelle de Tunis (UVT) et IBM. Il forme des compétences de plus en plus recherchées dans de nombreuses entreprises à travers le monde, dans des métiers à forte valeur ajoutée, encore rares à l\'échelle internationale.',
    objectifs: [
      'Former des compétences hautement recherchées dans les métiers à forte valeur ajoutée en Data Science et Mobiquité',
      'S\'insérer directement dans le monde de l\'industrie avec un bagage de compétences de très haute technicité',
      'S\'intégrer dans les métiers des études et du développement de projets informatiques qui analysent intelligemment de grandes masses de données hétérogènes et réparties',
      'Maîtriser et donner de la sémantique aux données massives et réparties',
      'Maîtriser les techniques statistiques et les outils informatiques pour faciliter la prise de décision',
    ],
    acces: [
      'Diplôme d\'au moins Bac+4 en Informatique, Informatique de gestion, Télécommunications ou Statistiques',
      'Avoir réussi la première année d\'un mastère professionnel ou de recherche en Informatique, Télécommunications ou Statistiques',
      'Sélection sur dossier + test technique en ligne',
    ],
    perspectives_pro: [
      'Analyste de données',
      'Expert des médias numériques',
      'Directeur des systèmes d\'information',
      'Analyste d\'affaires',
      'Responsable sécurité informatique',
      'Administrateur de base de données',
      'Expert de virtualisation',
      'Concepteur / Développeur Web',
      'Concepteur / Développeur Mobile',
      'Fondateur de startup en technologie',
    ],
    perspectives_academiques: [
      'Les étudiants les plus distingués sont soutenus pour obtenir des certifications produits IBM',
      'Des sessions extra-cursus sont organisées annuellement pour préparer les certifications',
    ],
    competences: [
      'Big Data & traitement de données massives',
      'Machine Learning & IA',
      'Cloud Computing',
      'Développement mobile',
      'Virtualisation',
      'Sécurité informatique',
      'Analyse statistique',
    ],
    partenaires: ['IBM', 'Université Virtuelle de Tunis (UVT)', 'ENICarthage'],
    modalite: [
      'L\'enseignement est essentiellement en ligne',
      'Les cours sont mis à disposition en ligne par séquences au fur et à mesure de l\'avancement',
      'Les étudiants communiquent via la plateforme avec leurs tuteurs',
      'Les étudiants sont suivis par des tuteurs tout au long de la formation',
      'Les examens sont présentiels',
      'Le contenu des modules et leur évaluation sont alignés sur la formation présentielle',
      'Un calendrier du déroulement est affiché aux étudiants au démarrage de l\'année universitaire',
    ],
    stage: 'Le stage de fin d\'études est assuré au sein d\'une entreprise pendant au moins 4 mois. Il permet aux étudiants de s\'insérer facilement dans le marché d\'emploi et d\'acquérir des compétences pour une future carrière professionnelle dans un environnement national ou international.',
  },

  doctorat: {
    sigle: 'PhD', nom: 'Doctorat en Génie Électrique',
    type: 'Doctorat', couleur: 'indigo', duree: '3 à 5 ans',
    intro: 'Le Doctorat en Génie Électrique de l\'ENICarthage est le programme doctoral unique proposé par l\'école, rattaché à l\'École Doctorale des Sciences et Technologies de l\'Ingénieur (STINGE). Il vise à développer les compétences en recherche dans les domaines du Traitement du Signal et de l\'Image, des Systèmes Électriques et Mécatroniques, de l\'Automatique et de l\'Informatique Industrielle ainsi que l\'Électronique et la Microélectronique.',
    objectifs: [
      'Développer des compétences avancées en recherche scientifique dans les domaines du Génie Électrique',
      'Contribuer à l\'avancement des connaissances en Traitement du Signal et de l\'Image',
      'Mener des travaux de recherche originaux sur les Systèmes Électriques et Mécatroniques',
      'Développer des recherches en Automatique et Informatique Industrielle',
      'Approfondir les travaux en Électronique et Microélectronique',
      'Publier des travaux dans des revues et conférences scientifiques internationales',
    ],
    acces: [
      'Master Recherche en Génie Électrique ou domaine connexe (EEA, Automatique, Traitement du Signal…)',
      'Très bonne moyenne au Master (≥ 14/20 recommandé)',
      'Projet de recherche validé par un directeur de thèse de l\'ENICarthage',
      'Dossier soumis et accepté par la Commission Scientifique de l\'École Doctorale STINGE',
      'Financement de thèse (bourse, contrat CIFRE ou convention de recherche)',
    ],
    perspectives_pro: [
      'Chercheur en R&D dans le secteur public ou privé',
      'Expert technique senior dans l\'industrie',
      'Consultant international en Génie Électrique',
      'Directeur de laboratoire de recherche',
      'Ingénieur de recherche dans un centre technologique',
    ],
    perspectives_academiques: [
      'Enseignant-Chercheur dans les universités et grandes écoles tunisiennes',
      'Maître de conférences ou Professeur des universités',
      'Chercheur postdoctoral à l\'international',
      'Directeur de thèse à l\'ENICarthage ou dans une université partenaire',
    ],
    competences: [
      'Traitement du Signal & Image',
      'Systèmes Électriques & Mécatroniques',
      'Automatique avancée',
      'Informatique Industrielle',
      'Électronique & Microélectronique',
      'Rédaction de publications scientifiques',
      'Encadrement et enseignement',
    ],
    partenaires: ['ENICarthage', 'École Doctorale STINGE', 'Laboratoires de recherche partenaires', 'Universités internationales'],
  },
};

@Component({
  selector: 'app-postlicence-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './postlicence-detail.component.html',
  styleUrl: './postlicence-detail.component.css'
})
export class PostlicenceDetailComponent implements OnInit {
  programme: ProgrammeDetail | null = null;
  activeTab = 'objectifs';

  tabs = [
    { id: 'objectifs',   label: 'Objectifs' },
    { id: 'acces',       label: 'Conditions d\'accès' },
    { id: 'pro',         label: 'Perspectives Pro.' },
    { id: 'academique',  label: 'Perspectives Acad.' },
    { id: 'competences', label: 'Compétences' },
    { id: 'partenaires', label: 'Partenaires' },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') ?? '';
      this.programme = PROGRAMMES[id] ?? null;
      this.activeTab = 'objectifs';
    });
  }

  hasTab(id: string): boolean {
    if (!this.programme) return false;
    if (id === 'academique') return this.programme.perspectives_academiques.length > 0;
    if (id === 'modalite') return !!(this.programme.modalite && this.programme.modalite.length > 0);
    return true;
  }

  goBack() { this.router.navigate(['/postlicence/accueil']); }
}
