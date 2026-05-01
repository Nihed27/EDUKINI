import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Enicarthage } from './enicarthage';

describe('Enicarthage', () => {
  let component: Enicarthage;
  let fixture: ComponentFixture<Enicarthage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Enicarthage],
    }).compileComponents();

    fixture = TestBed.createComponent(Enicarthage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
