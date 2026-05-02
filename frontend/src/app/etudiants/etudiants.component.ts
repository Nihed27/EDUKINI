import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student } from './student.model';
import { StudentService } from './student.service';

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

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.students = this.studentService.getAll();
    this.applySearch();
  }

  applySearch(): void {
    if (this.searchTerm.trim()) {
      this.filteredStudents = this.studentService.search(this.searchTerm);
    } else {
      this.filteredStudents = [...this.students];
    }
  }

  onSearch(): void {
    this.applySearch();
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.formData = this.emptyForm();
    this.showModal = true;
  }

  openEditModal(student: Student): void {
    this.isEditMode = true;
    this.selectedId = student.id;
    this.formData = {
      numeroInscription: student.numeroInscription,
      nom: student.nom,
      prenom: student.prenom,
      rang: student.rang,
      score: student.score,
      specialiteSouhaitee: student.specialiteSouhaitee,
      typeConcours: student.typeConcours,
      filierePrepa: student.filierePrepa
    };
    this.showModal = true;
  }

  saveStudent(): void {
    if (this.isEditMode && this.selectedId !== null) {
      this.studentService.update(this.selectedId, this.formData);
    } else {
      this.studentService.add(this.formData);
    }
    this.closeModal();
    this.loadStudents();
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
      this.studentService.delete(this.studentToDelete.id);
      this.studentToDelete = null;
      this.showDeleteConfirm = false;
      this.loadStudents();
    }
  }

  cancelDelete(): void {
    this.studentToDelete = null;
    this.showDeleteConfirm = false;
  }

  private emptyForm(): Omit<Student, 'id'> {
    return {
      numeroInscription: '',
      nom: '',
      prenom: '',
      rang: null,
      score: 0,
      specialiteSouhaitee: '',
      typeConcours: 'prepa',
      filierePrepa: ''
    };
  }
}