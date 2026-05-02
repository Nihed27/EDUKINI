import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student } from './student.model';
import { EtudiantApiService, BackendEtudiant } from '../services/etudiant-api.service';

@Component({
  selector: 'app-etudiants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './etudiants.component.html',
  styleUrl: './etudiants.component.css'
})
export class EtudiantsComponent implements OnInit {

  students: Student[] = [];
  filteredStudents: Student[] = [];
  searchTerm: string = '';

  showModal: boolean = false;
  isEditMode: boolean = false;
  showDeleteConfirm: boolean = false;
  studentToDelete: Student | null = null;

  formData: Omit<Student, 'id'> = this.emptyForm();
  selectedId: number | null = null;

  constructor(private etudiantApi: EtudiantApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.etudiantApi.getAll().subscribe({
      next: (etudiants) => {
        this.students = etudiants.map((e) => ({
          id: e.id ?? 0,
          nom: e.nom ?? '',
          prenom: e.prenom ?? '',
          email: e.email ?? '',
          filiere: e.filiere ?? '',
          annee: e.annee ?? '',
          etablissement: e.etablissement ?? ''
        }));
        this.applySearch();
        this.cdr.detectChanges();
      },
      error: () => {
        this.students = [];
        this.filteredStudents = [];
      }
    });
  }

  applySearch(): void {
    if (this.searchTerm.trim()) {
      const t = this.searchTerm.toLowerCase();
      this.filteredStudents = this.students.filter(
        (s) =>
          s.nom.toLowerCase().includes(t) ||
          s.prenom.toLowerCase().includes(t) ||
          s.email.toLowerCase().includes(t)
      );
    } else {
      this.filteredStudents = [...this.students];
    }
  }

  onSearch(): void { this.applySearch(); }

  openAddModal(): void {
    this.isEditMode = false;
    this.formData = this.emptyForm();
    this.showModal = true;
  }

  openEditModal(student: Student): void {
    this.isEditMode = true;
    this.selectedId = student.id;
    this.formData = {
      nom: student.nom,
      prenom: student.prenom,
      email: student.email,
      filiere: student.filiere,
      annee: student.annee,
      etablissement: student.etablissement
    };
    this.showModal = true;
  }

  saveStudent(): void {
    const payload: BackendEtudiant = { ...this.formData };

    if (this.isEditMode && this.selectedId !== null) {
      this.etudiantApi.update(this.selectedId, payload).subscribe({
        next: () => { this.closeModal(); this.loadStudents(); }
      });
    } else {
      this.etudiantApi.create(payload).subscribe({
        next: () => { this.closeModal(); this.loadStudents(); }
      });
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedId = null;
  }

  confirmDelete(student: Student): void {
    this.studentToDelete = student;
    this.showDeleteConfirm = true;
  }

  deleteStudent(): void {
    if (this.studentToDelete) {
      this.etudiantApi.delete(this.studentToDelete.id).subscribe({
        next: () => {
          this.studentToDelete = null;
          this.showDeleteConfirm = false;
          this.loadStudents();
        }
      });
    }
  }

  cancelDelete(): void {
    this.studentToDelete = null;
    this.showDeleteConfirm = false;
  }

  private emptyForm(): Omit<Student, 'id'> {
    return {
      nom: '',
      prenom: '',
      email: '',
      filiere: '',
      annee: '',
      etablissement: ''
    };
  }
}