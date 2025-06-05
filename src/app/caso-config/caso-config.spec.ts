import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasoConfig } from './caso-config';

describe('CasoConfig', () => {
  let component: CasoConfig;
  let fixture: ComponentFixture<CasoConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasoConfig]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasoConfig);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
