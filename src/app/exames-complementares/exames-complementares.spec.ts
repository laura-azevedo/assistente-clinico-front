import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamesComplementares } from './exames-complementares';

describe('ExamesComplementares', () => {
  let component: ExamesComplementares;
  let fixture: ComponentFixture<ExamesComplementares>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamesComplementares]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamesComplementares);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
