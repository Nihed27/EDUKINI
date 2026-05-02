import { Injectable } from '@angular/core';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[] = [
    { id: 1, nom: 'Ben Ali', prenom: 'Amir', email: 'amir@mail.com', filiere: 'Informatique', annee: '1ère Année', etablissement: 'ENICarthage' },
    { id: 2, nom: 'Chaabane', prenom: 'Lina', email: 'lina@mail.com', filiere: 'Infotronique', annee: '1ère Année', etablissement: 'ENICarthage' },
    { id: 3, nom: 'Mansouri', prenom: 'Yassine', email: 'yassine@mail.com', filiere: 'Mécatronique', annee: '2ème Année', etablissement: 'ENICarthage' },
    { id: 4, nom: 'Trabelsi', prenom: 'Nour', email: 'nour@mail.com', filiere: 'Industriel', annee: '1ère Année', etablissement: 'ENICarthage' },
    { id: 5, nom: 'Bouaziz', prenom: 'Sami', email: 'sami@mail.com', filiere: 'Informatique', annee: '3ème Année', etablissement: 'ENICarthage' },
    { id: 6, nom: 'Hamdi', prenom: 'Ines', email: 'ines@mail.com', filiere: 'Infotronique', annee: '2ème Année', etablissement: 'ENICarthage' },
    { id: 7, nom: 'Gharbi', prenom: 'Rami', email: 'rami@mail.com', filiere: 'Industriel', annee: '1ère Année', etablissement: 'ENICarthage' },
    { id: 8, nom: 'Ayari', prenom: 'Salma', email: 'salma@mail.com', filiere: 'Mécatronique', annee: '3ème Année', etablissement: 'ENICarthage' },
  ];

  private nextId = 9;

  getAll(): Student[] {
    return [...this.students];
  }

  getById(id: number): Student | undefined {
    return this.students.find(s => s.id === id);
  }

  add(student: Omit<Student, 'id'>): Student {
    const newStudent: Student = { ...student, id: this.nextId++ };
    this.students.push(newStudent);
    return newStudent;
  }

  update(id: number, data: Omit<Student, 'id'>): Student | null {
    const index = this.students.findIndex(s => s.id === id);
    if (index === -1) return null;
    this.students[index] = { id, ...data };
    return this.students[index];
  }

  delete(id: number): boolean {
    const index = this.students.findIndex(s => s.id === id);
    if (index === -1) return false;
    this.students.splice(index, 1);
    return true;
  }

  search(term: string): Student[] {
    const t = term.toLowerCase();
    return this.students.filter(s =>
      s.nom.toLowerCase().includes(t) ||
      s.prenom.toLowerCase().includes(t) ||
      s.email.toLowerCase().includes(t)
    );
  }
}