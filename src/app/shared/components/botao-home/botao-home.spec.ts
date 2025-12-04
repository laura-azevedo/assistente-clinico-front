import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoHome } from './botao-home';

describe('BotaoHome', () => {
  let component: BotaoHome;
  let fixture: ComponentFixture<BotaoHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
