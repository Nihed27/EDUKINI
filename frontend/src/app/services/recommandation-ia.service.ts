import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ProfilCandidat {
  licence: string;
  specialite: string;
  moyenne: number;
  niveauAnglais: string;
  competences: string[];
  motivation: string;
}

export interface RecommandationProgramme {
  programme: string;
  pourcentage: number;
  raison: string;
  points_forts: string[];
  points_faibles: string[];
}

export interface RecommandationResult {
  recommandations: RecommandationProgramme[];
  meilleur_choix: string;
  conseil: string;
}

@Injectable({ providedIn: 'root' })
export class RecommandationIaService {

  private apiUrl = 'https://api.groq.com/openai/v1/chat/completions';

  constructor(private http: HttpClient) {}

  analyserProfil(profil: ProfilCandidat): Observable<RecommandationResult> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.groqApiKey}`
    });

    const systemPrompt = `Tu es un conseiller d'orientation académique expert en masters et doctorats tunisiens à l'ENICarthage. Analyse le profil étudiant et retourne UNIQUEMENT un JSON valide sans markdown ni backticks avec cette structure :
{
  "recommandations": [
    {
      "programme": "nom du programme",
      "pourcentage": number entre 0 et 100,
      "raison": "explication courte",
      "points_forts": ["point1", "point2"],
      "points_faibles": ["point1", "point2"]
    }
  ],
  "meilleur_choix": "nom du programme recommandé",
  "conseil": "conseil personnalisé"
}

Les 4 programmes disponibles sont :
1. Master TIC — Réseaux et Multimédia (Recherche, 2 ans) - Requiert licence en Informatique/Réseaux/Télécoms, anglais >= Intermédiaire, moyenne >= 12
2. Master ARTI/WESET — Automatique, Robotique & Wind Energy (Recherche, 2 ans) - Requiert licence en EEA/Génie Électrique, compétences Automatique/Électronique, moyenne >= 12
3. Master MPSDM — Sciences des Données & Mobiquité (Professionnel, 2 semestres) - Requiert compétences Data Science/Informatique/Mathématiques, expérience industrielle bonus
4. Doctorat en Génie Électrique (3 à 5 ans) - Requiert licence/master Génie Électrique, moyenne >= 14, publications bonus

Trie par pourcentage décroissant.`;

    const userMessage = `Profil étudiant :
- Licence obtenue : ${profil.licence}
- Spécialité : ${profil.specialite}
- Moyenne générale : ${profil.moyenne}/20
- Niveau d'anglais : ${profil.niveauAnglais}
- Compétences : ${profil.competences.join(', ')}
- Motivation : ${profil.motivation}`;

    const body = {
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.3,
      max_tokens: 2048
    };

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      map(response => {
        const content = response.choices?.[0]?.message?.content || '';
        let cleaned = content.trim();
        cleaned = cleaned.replace(/```json\s*/gi, '').replace(/```\s*/g, '');
        cleaned = cleaned.trim();
        try {
          return JSON.parse(cleaned) as RecommandationResult;
        } catch {
          throw new Error('Erreur de parsing de la réponse IA : ' + cleaned.substring(0, 200));
        }
      })
    );
  }
}
