import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hipotese } from './hipotese';

describe('Hipotese', () => {
  let component: Hipotese;
  let fixture: ComponentFixture<Hipotese>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hipotese]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hipotese);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
