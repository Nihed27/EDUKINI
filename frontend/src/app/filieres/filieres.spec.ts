import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { FilieresComponent } from './filieres';

describe('FilieresComponent', () => {
  let component: FilieresComponent;
  let fixture: ComponentFixture<FilieresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilieresComponent, CommonModule, FormsModule, ReactiveFormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(FilieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => expect(component).toBeTruthy());

  it('devrait charger 4 filières par défaut', () => {
    expect(component.filieres.length).toBe(4);
  });

  it('devrait afficher les 4 filières en vue cartes', () => {
    component.viewMode = 'cards';
    fixture.detectChanges();
    const cards = fixture.debugElement.queryAll(By.css('.filiere-card:not(.card-add)'));
    expect(cards.length).toBe(4);
  });

  it('devrait ouvrir le modal d\'ajout', () => {
    component.openModal();
    expect(component.showModal).toBeTrue();
    expect(component.editingFiliere).toBeNull();
  });

  it('devrait ouvrir le modal en mode édition', () => {
    const f = component.filieres[0];
    component.openModal(f);
    expect(component.editingFiliere).toEqual(f);
    expect(component.filiereForm.get('nom')?.value).toBe(f.nom);
  });

  it('devrait fermer le modal', () => {
    component.openModal();
    component.closeModal();
    expect(component.showModal).toBeFalse();
  });

  it('devrait ajouter une nouvelle filière', () => {
    const before = component.filieres.length;
    component.openModal();
    component.filiereForm.setValue({
      nom: 'Génie Électrique', code: 'GE', icon: '⚡',
      couleur: '#1a73e8', description: 'Test description filière',
      capacite: 50, scoreMin: 65, duree: '3 ans', actif: true
    });
    component.debouchesList = ['Ingénieur électrique'];
    component.competencesList = ['Électricité'];
    component.saveFiliere();
    expect(component.filieres.length).toBe(before + 1);
  });

  it('devrait modifier une filière existante', () => {
    const f = component.filieres[0];
    component.openModal(f);
    component.filiereForm.patchValue({ nom: 'Génie Info Modifié' });
    component.saveFiliere();
    expect(component.filieres[0].nom).toBe('Génie Info Modifié');
  });

  it('devrait ouvrir la confirmation de suppression', () => {
    component.confirmDelete(component.filieres[0]);
    expect(component.showDeleteConfirm).toBeTrue();
  });

  it('devrait supprimer une filière', () => {
    const before = component.filieres.length;
    const f = component.filieres[0];
    component.confirmDelete(f);
    component.executeDelete();
    expect(component.filieres.length).toBe(before - 1);
  });

  it('devrait annuler la suppression', () => {
    const before = component.filieres.length;
    component.confirmDelete(component.filieres[0]);
    component.cancelDelete();
    expect(component.showDeleteConfirm).toBeFalse();
    expect(component.filieres.length).toBe(before);
  });

  it('devrait filtrer par recherche', () => {
    component.searchQuery = 'Informatique';
    expect(component.filieresFiltrees.length).toBe(1);
  });

  it('devrait calculer le taux de remplissage', () => {
    const f = component.filieres[0];
    const taux = component.getTauxRemplissage(f);
    expect(taux).toBe(Math.round((f.nbEtudiants / f.capacite) * 100));
  });

  it('devrait basculer le statut actif', () => {
    const f = component.filieres[0];
    const initial = f.actif;
    component.toggleActif(f);
    expect(f.actif).toBe(!initial);
  });

  it('devrait ajouter un débouché', () => {
    component.openModal();
    component.newDebouche = 'Nouveau débouché';
    component.addDebouche();
    expect(component.debouchesList).toContain('Nouveau débouché');
  });

  it('devrait supprimer un débouché', () => {
    component.openModal();
    component.debouchesList = ['A', 'B', 'C'];
    component.removeDebouche(1);
    expect(component.debouchesList).toEqual(['A', 'C']);
  });
});