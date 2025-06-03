import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoLogin } from './botao-login';

describe('BotaoLogin', () => {
  let component: BotaoLogin;
  let fixture: ComponentFixture<BotaoLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
