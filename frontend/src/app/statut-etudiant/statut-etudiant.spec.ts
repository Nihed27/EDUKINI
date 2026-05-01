import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutEtudiant } from './statut-etudiant';

describe('StatutEtudiant', () => {
  let component: StatutEtudiant;
  let fixture: ComponentFixture<StatutEtudiant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatutEtudiant],
    }).compileComponents();

    fixture = TestBed.createComponent(StatutEtudiant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
