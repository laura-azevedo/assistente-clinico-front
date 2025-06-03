import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoCadastro } from './botao-cadastro';

describe('BotaoCadastro', () => {
  let component: BotaoCadastro;
  let fixture: ComponentFixture<BotaoCadastro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoCadastro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoCadastro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
