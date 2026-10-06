import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RutinasService } from '../../../core/services/rutinas.service';
import { RutinasPage } from './rutinas-page';

describe('RutinasPage', () => {
  let component: RutinasPage;
  let fixture: ComponentFixture<RutinasPage>;
  let service: RutinasService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [RutinasPage], providers: [provideRouter([])] }).compileComponents();
    fixture = TestBed.createComponent(RutinasPage);
    component = fixture.componentInstance;
    service = TestBed.inject(RutinasService);
    fixture.detectChanges();
  });

  it('abre y cierra el modal desde sus acciones', () => {
    (fixture.nativeElement.querySelector('.btn-primary') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(component.showModal).toBe(true);
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).not.toBeNull();
    (fixture.nativeElement.querySelector('.modal-actions .btn-secondary') as HTMLButtonElement).click();
    expect(component.showModal).toBe(false);
  });

  it('valida los campos requeridos y no crea una rutina inválida', () => {
    const initialCount = service.rutinas().length;
    component.openModal();
    component.guardarRutina();
    expect(component.rutinaForm.invalid).toBe(true);
    expect(service.rutinas().length).toBe(initialCount);
  });

  it('agrega y elimina controles de ejercicio', () => {
    component.openModal();
    component.addEjercicio();
    expect(component.ejerciciosFormArray.length).toBe(2);
    component.removeEjercicio(1);
    expect(component.ejerciciosFormArray.length).toBe(1);
  });

  it('crea una rutina válida y cierra el modal', () => {
    const initialCount = service.rutinas().length;
    component.openModal();
    component.rutinaForm.controls.nombre.setValue('Fuerza base');
    component.ejerciciosFormArray.at(0).setValue({ ejercicioId: 'exercise-squat', series: 4, repeticiones: 10, descansoSegundos: 60 });
    component.guardarRutina();
    expect(service.rutinas().length).toBe(initialCount + 1);
    expect(service.rutinas().at(-1)?.nombre).toBe('Fuerza base');
    expect(component.showModal).toBe(false);
  });
});
