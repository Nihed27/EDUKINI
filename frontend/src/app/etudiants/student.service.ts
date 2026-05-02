import { Injectable } from '@angular/core';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[] = [
    { id: 1, numeroInscription: 'INS-2024-001', nom: 'Ben Ali', prenom: 'Amir', rang: 1, score: 93.50, specialiteSouhaitee: 'Informatique', typeConcours: 'prepa', filierePrepa: 'Physique Mathématique' },
    { id: 2, numeroInscription: 'INS-2024-002', nom: 'Chaabane', prenom: 'Lina', rang: 2, score: 91.20, specialiteSouhaitee: 'Génie mécatronique', typeConcours: 'prepa', filierePrepa: 'Physique Chimie' },
    { id: 3, numeroInscription: 'INS-2024-003', nom: 'Mansouri', prenom: 'Yassine', rang: null, score: 87.75, specialiteSouhaitee: 'Génie infotronique', typeConcours: 'specifique', filierePrepa: '' },
    { id: 4, numeroInscription: 'INS-2024-004', nom: 'Trabelsi', prenom: 'Nour', rang: 3, score: 85.40, specialiteSouhaitee: 'Génie industriel', typeConcours: 'prepa', filierePrepa: 'Physique Techniques' },
    { id: 5, numeroInscription: 'INS-2024-005', nom: 'Bouaziz', prenom: 'Sami', rang: null, score: 82.60, specialiteSouhaitee: 'Informatique', typeConcours: 'specifique', filierePrepa: '' },
    { id: 6, numeroInscription: 'INS-2024-006', nom: 'Hamdi', prenom: 'Ines', rang: 4, score: 80.30, specialiteSouhaitee: 'Génie mécatronique', typeConcours: 'prepa', filierePrepa: 'Physique Mathématique' },
    { id: 7, numeroInscription: 'INS-2024-007', nom: 'Gharbi', prenom: 'Rami', rang: null, score: 78.90, specialiteSouhaitee: 'Génie Industriel', typeConcours: 'specifique', filierePrepa: '' },
    { id: 8, numeroInscription: 'INS-2024-008', nom: 'Ayari', prenom: 'Salma', rang: 5, score: 76.50, specialiteSouhaitee: 'Génie mécatronique', typeConcours: 'prepa', filierePrepa: 'Physique Chimie' },
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
      s.numeroInscription.toLowerCase().includes(t)
    );
  }
}