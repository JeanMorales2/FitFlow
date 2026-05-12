import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinaDetallePage } from './rutina-detalle-page';

describe('RutinaDetallePage', () => {
  let component: RutinaDetallePage;
  let fixture: ComponentFixture<RutinaDetallePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutinaDetallePage],
    }).compileComponents();

    fixture = TestBed.createComponent(RutinaDetallePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
