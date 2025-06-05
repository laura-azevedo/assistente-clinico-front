import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoConfig } from './botao-config';

describe('BotaoConfig', () => {
  let component: BotaoConfig;
  let fixture: ComponentFixture<BotaoConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoConfig]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoConfig);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
