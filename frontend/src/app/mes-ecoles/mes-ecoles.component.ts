import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
interface Ecole {
  sigle: string;
  nom: string;
  ville: string;
  annee: number;
  fondation: number;
  description: string;
  specialites: string[];
  specs: string[];
  site: string;
  siteUrl: string;
  directeur?: string;
  note?: string;
  accreditation?: string;
  universite?: string;
  campus?: string;
  langues?: string[];
}
@Component({
  selector: "app-mes-ecoles",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./mes-ecoles.component.html",
  styleUrl: "./mes-ecoles.component.css"
})
export class MesEcolesComponent {
  selectedEcole: Ecole | null = null;
  ecoles: Ecole[] = [
    {
      sigle: "ENICarthage", nom: "Ecole Nationale d Ingenieurs de Carthage",
      ville: "Tunis", annee: 1999, fondation: 1999,
      description: "Formation en ingenierie avec ouverture internationale",
      specialites: ["Genie logiciel", "Reseaux", "Electronique"],
      specs: ["Genie logiciel", "Reseaux", "Electronique embarquee"],
      site: "www.enicarthage.rnu.tn", siteUrl: "https://www.enicarthage.rnu.tn",
      directeur: "Direction ENICarthage", note: "",
      accreditation: "CTI", universite: "Universite de Carthage",
      campus: "Tunis", langues: ["Francais", "Anglais"]
    },
    {
      sigle: "ENIT", nom: "Ecole Nationale d Ingenieurs de Tunis",
      ville: "Tunis", annee: 1968, fondation: 1968,
      description: "Leader en formation d ingenieurs en Tunisie depuis 1968",
      specialites: ["Genie civil", "Genie electrique"],
      specs: ["Genie civil", "Genie electrique", "Genie mecanique"],
      site: "www.enit.rnu.tn", siteUrl: "https://www.enit.rnu.tn",
      directeur: "Direction ENIT", note: "",
      accreditation: "CTI", universite: "Universite de Tunis El Manar",
      campus: "Belvedere, Tunis", langues: ["Francais", "Anglais"]
    },
    {
      sigle: "ENIS", nom: "Ecole Nationale d Ingenieurs de Sfax",
      ville: "Sfax", annee: 1983, fondation: 1983,
      description: "Excellence en ingenierie industrielle et technologique",
      specialites: ["Genie biologique", "Genie civil"],
      specs: ["Genie biologique", "Genie civil", "Genie industriel"],
      site: "www.enis.rnu.tn", siteUrl: "https://www.enis.rnu.tn",
      directeur: "Direction ENIS", note: "",
      accreditation: "CTI", universite: "Universite de Sfax",
      campus: "Sfax", langues: ["Francais", "Anglais"]
    },
    {
      sigle: "ENISo", nom: "Ecole Nationale d Ingenieurs de Sousse",
      ville: "Sousse", annee: 2005, fondation: 2005,
      description: "Innovation et technologie au coeur du Sahel",
      specialites: ["Genie informatique", "Genie mecatronique"],
      specs: ["Genie informatique", "Genie mecatronique"],
      site: "www.eniso.rnu.tn", siteUrl: "https://www.eniso.rnu.tn",
      directeur: "Direction ENISo", note: "",
      accreditation: "CTI", universite: "Universite de Sousse",
      campus: "Sousse", langues: ["Francais", "Anglais"]
    },
    {
      sigle: "ENSI", nom: "Ecole Nationale des Sciences de l Informatique",
      ville: "La Manouba", annee: 1984, fondation: 1984,
      description: "Specialiste des technologies de l information",
      specialites: ["Ingenierie logicielle", "Systemes information"],
      specs: ["Ingenierie logicielle", "Systemes information", "IA"],
      site: "www.ensi.rnu.tn", siteUrl: "https://www.ensi.rnu.tn",
      directeur: "Direction ENSI", note: "",
      accreditation: "CTI", universite: "Universite de la Manouba",
      campus: "La Manouba", langues: ["Francais", "Anglais"]
    },
    {
      sigle: "EPT", nom: "Ecole Polytechnique de Tunisie",
      ville: "La Marsa", annee: 1992, fondation: 1992,
      description: "Formation d elite en ingenierie et sciences",
      specialites: ["Sciences fondamentales", "Ingenierie"],
      specs: ["Sciences fondamentales", "Ingenierie generale"],
      site: "www.ept.rnu.tn", siteUrl: "https://www.ept.rnu.tn",
      directeur: "Direction EPT", note: "",
      accreditation: "CTI", universite: "Universite de Carthage",
      campus: "La Marsa", langues: ["Francais", "Anglais"]
    },
    {
      sigle: "SUPCOM", nom: "Ecole Superieure des Communications de Tunis",
      ville: "Ariana", annee: 1998, fondation: 1998,
      description: "Reference en telecommunications et numerique",
      specialites: ["Reseaux", "Telecommunications"],
      specs: ["Reseaux", "Telecommunications", "Numerique"],
      site: "www.supcom.tn", siteUrl: "https://www.supcom.tn",
      directeur: "Direction SUPCOM", note: "",
      accreditation: "CTI", universite: "Universite de Carthage",
      campus: "Ariana", langues: ["Francais", "Anglais"]
    },
    {
      sigle: "ENIM", nom: "Ecole Nationale d Ingenieurs de Monastir",
      ville: "Monastir", annee: 1987, fondation: 1987,
      description: "Ingenierie textile et mecanique",
      specialites: ["Genie mecanique", "Genie textile"],
      specs: ["Genie mecanique", "Genie textile", "Genie industriel"],
      site: "www.enim.rnu.tn", siteUrl: "https://www.enim.rnu.tn",
      directeur: "Direction ENIM", note: "",
      accreditation: "CTI", universite: "Universite de Monastir",
      campus: "Monastir", langues: ["Francais", "Anglais"]
    }
  ];
  constructor(private router: Router) {}
  openModal(ecole: Ecole): void {
    this.selectedEcole = ecole;
  }
  closeModal(): void {
    this.selectedEcole = null;
  }
  voirDetails(ecole: Ecole): void {
    this.selectedEcole = ecole;
  }
  getMapsUrl(ecole: Ecole): string {
    return "https://www.google.com/maps/search/" + encodeURIComponent(ecole.nom + " " + ecole.ville);
  }
  getLanguesStr(langues?: string[]): string {
    return langues ? langues.join(", ") : "";
  }
}
