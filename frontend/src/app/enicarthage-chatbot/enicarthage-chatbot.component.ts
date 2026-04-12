import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  role: 'user' | 'bot';
  text: string;
  time: string;
}

@Component({
  selector: 'app-enicarthage-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enicarthage-chatbot.component.html',
  styleUrl: './enicarthage-chatbot.component.css'
})
export class EnicarthageChatbotComponent implements AfterViewChecked {
  @ViewChild('messagesEnd') messagesEnd!: ElementRef;

  question = '';
  isTyping = false;

  messages: Message[] = [
    {
      role: 'bot',
      text: "Bonjour ! Je suis l'assistant IA d'ENICarthage. Je peux répondre à toutes vos questions sur les spécialités, les programmes, les débouchés et la vie à l'école. Comment puis-je vous aider ?",
      time: this.getTime()
    }
  ];

  suggestions = [
    'Quelles sont les spécialités disponibles ?',
    'Quelle spécialité choisir si j\'aime la programmation ?',
    'Quels sont les débouchés du GL ?',
    'Combien de places en RSC ?',
    'Quelle est la différence entre GL et RSC ?',
    'Comment fonctionne le choix de spécialité ?',
  ];

  private faq: { keywords: string[], answer: string }[] = [
    {
      keywords: ['spécialité', 'spécialités', 'disponible', 'liste', 'choix', 'filière'],
      answer: `ENICarthage propose **3 spécialités** pour les étudiants de 2ème et 3ème année :\n\n🔵 **GL — Génie Logiciel et Systèmes Informatiques**\nConception de logiciels, architecture des systèmes, méthodes agiles, DevOps. 40 places disponibles.\n\n🟣 **RSC — Réseaux et Systèmes de Communication**\nInfrastructure réseau, sécurité informatique, cloud computing, virtualisation. 35 places disponibles.\n\n🟠 **ESE — Électronique et Systèmes Embarqués**\nCircuits électroniques, IoT, systèmes temps réel, FPGA. 30 places disponibles.`
    },
    {
      keywords: ['gl', 'génie logiciel', 'logiciel', 'programmation', 'développement', 'software'],
      answer: `**Génie Logiciel et Systèmes Informatiques (GL)** 🔵\n\n📚 Matières enseignées :\n• Algorithmique avancée\n• Architecture logicielle\n• Bases de données\n• Génie logiciel agile\n• Cloud computing & DevOps\n\n💼 Débouchés :\n• Développeur logiciel senior\n• Architecte SI\n• Chef de projet IT\n• Ingénieur DevOps\n\n🎯 **40 places disponibles** — Idéale si vous aimez la programmation et la conception de systèmes.`
    },
    {
      keywords: ['rsc', 'réseau', 'réseaux', 'communication', 'sécurité', 'cybersécurité', 'cloud'],
      answer: `**Réseaux et Systèmes de Communication (RSC)** 🟣\n\n📚 Matières enseignées :\n• Protocoles réseau\n• Sécurité informatique\n• Virtualisation & Cloud\n• Administration systèmes\n• Télécommunications\n\n💼 Débouchés :\n• Ingénieur réseau\n• Expert cybersécurité\n• Administrateur systèmes\n• Consultant cloud\n\n🎯 **35 places disponibles** — Parfaite si vous êtes passionné par les infrastructures et la sécurité.`
    },
    {
      keywords: ['ese', 'électronique', 'embarqué', 'iot', 'fpga', 'signal', 'hardware'],
      answer: `**Électronique et Systèmes Embarqués (ESE)** 🟠\n\n📚 Matières enseignées :\n• Électronique numérique\n• Systèmes embarqués\n• FPGA & conception matérielle\n• IoT\n• Traitement du signal\n\n💼 Débouchés :\n• Ingénieur embarqué\n• Concepteur FPGA\n• Ingénieur IoT\n• Ingénieur R&D\n\n🎯 **30 places disponibles** — Recommandée si vous êtes fort en électronique et physique.`
    },
    {
      keywords: ['débouché', 'débouchés', 'emploi', 'travail', 'métier', 'carrière', 'poste'],
      answer: `Voici les principaux **débouchés** selon chaque spécialité :\n\n🔵 **GL** : Développeur logiciel, Architecte SI, Chef de projet IT, Ingénieur DevOps\n\n🟣 **RSC** : Ingénieur réseau, Expert cybersécurité, Administrateur systèmes, Consultant cloud\n\n🟠 **ESE** : Ingénieur embarqué, Concepteur FPGA, Ingénieur IoT, Ingénieur R&D\n\nLes diplômés d'ENICarthage sont très recherchés sur le marché tunisien et international.`
    },
    {
      keywords: ['place', 'places', 'capacité', 'nombre'],
      answer: `Voici les **places disponibles** par spécialité :\n\n🔵 **GL** — Génie Logiciel : **40 places**\n🟣 **RSC** — Réseaux : **35 places**\n🟠 **ESE** — Électronique : **30 places**\n\nTotal : **105 places** pour la promotion. Le choix se fait en fin de 1ère année selon votre moyenne et vos préférences.`
    },
    {
      keywords: ['différence', 'comparer', 'choisir', 'entre', 'lequel', 'laquelle', 'meilleur'],
      answer: `Voici comment **choisir votre spécialité** :\n\n🔵 **Choisissez GL si** :\n→ Vous aimez la programmation et les algorithmes\n→ Vous voulez concevoir des logiciels et systèmes\n→ Vous êtes fort en Algorithmique et POO\n\n🟣 **Choisissez RSC si** :\n→ Vous êtes passionné par les réseaux et la sécurité\n→ Vous aimez administrer des systèmes\n→ Vous avez de bonnes bases en systèmes d'exploitation\n\n🟠 **Choisissez ESE si** :\n→ Vous aimez l'électronique et le hardware\n→ Vous voulez travailler sur des systèmes physiques\n→ Vous êtes fort en électronique et physique`
    },
    {
      keywords: ['fonctionnement', 'processus', 'comment', 'procédure', 'étape', 'déroulement'],
      answer: `**Comment fonctionne le choix de spécialité ?** 📋\n\n**Étape 1** — Consultez votre profil académique et vos notes\n**Étape 2** — Explorez les 3 spécialités (programmes, débouchés)\n**Étape 3** — Consultez les recommandations IA basées sur votre profil\n**Étape 4** — Classez vos spécialités par ordre de préférence\n**Étape 5** — Soumettez vos choix avant la date limite\n\n⏰ La période de choix est ouverte jusqu'au **30 juin 2025**. L'affectation finale tient compte de votre moyenne et du nombre de places disponibles.`
    },
    {
      keywords: ['moyenne', 'note', 'critère', 'admission', 'affectation', 'classement'],
      answer: `**Critères d'affectation aux spécialités** 📊\n\nL'affectation finale est basée sur :\n\n• **Votre moyenne générale** de 1ère année\n• **Votre classement** dans la promotion\n• **Vos vœux** classés par ordre de préférence\n• **Les places disponibles** dans chaque spécialité\n\n💡 Conseil : Complétez votre profil académique dans l'onglet "Mon Profil" pour obtenir des recommandations IA personnalisées basées sur vos vraies notes.`
    },
    {
      keywords: ['enicarthage', 'école', 'établissement', 'histoire', 'présentation', 'info'],
      answer: `**ENICarthage — École Nationale d'Ingénieurs de Carthage** 🏫\n\nENICarthage est une grande école d'ingénieurs tunisienne réputée, formant des ingénieurs polyvalents et innovants.\n\n📍 Localisation : Carthage, Tunis\n🎓 Durée de la formation : 5 ans (2 ans prépa + 3 ans ingénieur)\n🏆 Accréditation : CTI (Commission des Titres d'Ingénieur)\n\n**Spécialités proposées :**\n• Génie Logiciel (GL)\n• Réseaux et Communication (RSC)\n• Électronique Embarquée (ESE)`
    },
    {
      keywords: ['date', 'délai', 'deadline', 'limite', 'juin', 'calendrier'],
      answer: `**Calendrier important** 📅\n\n• **Période de choix ouverte** : Dès maintenant\n• **Date limite de soumission** : 15 juin 2025\n• **Résultats d'affectation** : Fin juin 2025\n• **Début des cours en spécialité** : Septembre 2025\n\n⚠️ Ne tardez pas à soumettre vos choix ! Plus vous attendez, moins vous avez de flexibilité si des ajustements sont nécessaires.`
    },
  ];

  getTime(): string {
    return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    try {
      this.messagesEnd.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } catch (e) {}
  }

  sendMessage() {
    const q = this.question.trim();
    if (!q) return;

    this.messages.push({ role: 'user', text: q, time: this.getTime() });
    this.question = '';
    this.isTyping = true;

    setTimeout(() => {
      const answer = this.getAnswer(q);
      this.messages.push({ role: 'bot', text: answer, time: this.getTime() });
      this.isTyping = false;
    }, 900);
  }

  sendSuggestion(s: string) {
    this.question = s;
    this.sendMessage();
  }

  getAnswer(q: string): string {
    const lower = q.toLowerCase();

    for (const faq of this.faq) {
      if (faq.keywords.some(k => lower.includes(k))) {
        return faq.answer;
      }
    }

    return `Je suis désolé, je ne peux répondre qu'aux questions concernant **ENICarthage**, ses **spécialités** (GL, RSC, ESE), les **programmes**, les **débouchés** et les **procédures de choix**.\n\nEssayez par exemple :\n• "Quelles sont les spécialités disponibles ?"\n• "Quels sont les débouchés du GL ?"\n• "Comment fonctionne le choix de spécialité ?"`;
  }

  formatMessage(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}