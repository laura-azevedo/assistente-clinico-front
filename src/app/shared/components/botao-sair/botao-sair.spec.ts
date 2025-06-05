import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoSair } from './botao-sair';

describe('BotaoSair', () => {
  let component: BotaoSair;
  let fixture: ComponentFixture<BotaoSair>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoSair]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoSair);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
