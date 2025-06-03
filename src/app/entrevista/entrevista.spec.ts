import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Entrevista } from './entrevista';

describe('Entrevista', () => {
  let component: Entrevista;
  let fixture: ComponentFixture<Entrevista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Entrevista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Entrevista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
