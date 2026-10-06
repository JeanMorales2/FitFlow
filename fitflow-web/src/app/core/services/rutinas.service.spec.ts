import { TestBed } from '@angular/core/testing';
import { RutinasService } from './rutinas.service';

describe('RutinasService', () => {
  let service: RutinasService;
  beforeEach(() => { TestBed.configureTestingModule({}); service = TestBed.inject(RutinasService); });

  it('devuelve las rutinas y busca una por ID estable', () => {
    const rutinas = service.rutinas();
    expect(rutinas.length).toBeGreaterThan(0);
    expect(service.getById(rutinas[0].id)).toBe(rutinas[0]);
    expect(service.getById('missing-routine')).toBeUndefined();
  });

  it('crea una rutina con IDs estables y la conserva en la fuente única', () => {
    const created = service.create({ nombre: '  Rutina nueva  ', nivel: 'Principiante', ejercicios: [{ ejercicioId: 'exercise-squat', series: 3 }] });
    const originalId = created.id;
    expect(originalId).toMatch(/^routine-/);
    expect(created.ejercicios[0].id).toContain(originalId);
    expect(service.getById(originalId)).toBe(created);
    expect(service.getById(originalId)?.id).toBe(originalId);
  });

  it('rechaza rutinas sin ejercicios o con ejercicios duplicados', () => {
    expect(() => service.create({ nombre: 'Vacía', nivel: 'Principiante', ejercicios: [] })).toThrow();
    expect(() => service.create({ nombre: 'Duplicada', nivel: 'Intermedio', ejercicios: [{ ejercicioId: 'exercise-squat' }, { ejercicioId: 'exercise-squat' }] })).toThrow();
  });

  it('rechaza referencias y configuraciones de ejercicio inválidas', () => {
    expect(() => service.create({ nombre: 'Desconocida', nivel: 'Principiante', ejercicios: [{ ejercicioId: 'missing-exercise' }] })).toThrow();
    expect(() => service.create({ nombre: 'Series inválidas', nivel: 'Principiante', ejercicios: [{ ejercicioId: 'exercise-squat', series: 0 }] })).toThrow();
    expect(() => service.create({ nombre: 'Descanso inválido', nivel: 'Principiante', ejercicios: [{ ejercicioId: 'exercise-squat', descansoSegundos: -1 }] })).toThrow();
  });
});
