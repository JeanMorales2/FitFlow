import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinasPage } from './rutinas-page';

describe('RutinasPage', () => {
  let component: RutinasPage;
  let fixture: ComponentFixture<RutinasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutinasPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RutinasPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
