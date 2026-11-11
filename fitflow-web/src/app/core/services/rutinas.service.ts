import { Injectable, inject, signal } from '@angular/core';
import { CrearRutina, Rutina } from '../models/rutina.model';
import { EjerciciosService } from './ejercicios.service';

const RUTINAS_INICIALES: readonly Rutina[] = [
  {
    id: 'routine-beginner-legs', nombre: 'Rutina Pierna Inicial',
    descripcion: 'Una base accesible para desarrollar fuerza en el tren inferior.', nivel: 'Principiante', estado: 'Activa',
    ejercicios: [
      { id: 'routine-exercise-beginner-squat', ejercicioId: 'exercise-squat', orden: 1, series: 4, repeticiones: 12, descansoSegundos: 60 },
      { id: 'routine-exercise-beginner-press', ejercicioId: 'exercise-leg-press', orden: 2, series: 3, repeticiones: 10, descansoSegundos: 90 },
    ],
  },
  {
    id: 'routine-intermediate-back', nombre: 'Rutina Espalda Intermedia',
    descripcion: 'Trabajo de tirón vertical y horizontal para una espalda equilibrada.', nivel: 'Intermedio', estado: 'Activa',
    ejercicios: [
      { id: 'routine-exercise-back-pull-up', ejercicioId: 'exercise-pull-up', orden: 1, series: 4, repeticiones: 8, descansoSegundos: 90 },
      { id: 'routine-exercise-back-row', ejercicioId: 'exercise-barbell-row', orden: 2, series: 4, repeticiones: 10, descansoSegundos: 75 },
    ],
  },
];

@Injectable({ providedIn: 'root' })
export class RutinasService {
  private readonly ejerciciosService = inject(EjerciciosService);
  private readonly _rutinas = signal<readonly Rutina[]>(RUTINAS_INICIALES);
  readonly rutinas = this._rutinas.asReadonly();

  getById(id: string): Rutina | undefined {
    return this._rutinas().find((rutina) => rutina.id === id);
  }

  create(input: CrearRutina): Rutina {
    const ejercicioIds = input.ejercicios.map((ejercicio) => ejercicio.ejercicioId);
    const hasInvalidConfiguration = input.ejercicios.some((ejercicio) =>
      !this.ejerciciosService.getById(ejercicio.ejercicioId)
      || !this.isOptionalInteger(ejercicio.series, 1)
      || !this.isOptionalInteger(ejercicio.repeticiones, 1)
      || !this.isOptionalInteger(ejercicio.descansoSegundos, 0));
    if (!input.nombre.trim() || input.ejercicios.length === 0
      || new Set(ejercicioIds).size !== ejercicioIds.length || hasInvalidConfiguration) {
      throw new Error('Los datos de la rutina o de sus ejercicios no son válidos.');
    }

    const routineId = `routine-${crypto.randomUUID()}`;
    const nuevaRutina: Rutina = {
      id: routineId,
      nombre: input.nombre.trim(),
      descripcion: input.descripcion?.trim() || undefined,
      nivel: input.nivel,
      estado: 'Activa',
      ejercicios: input.ejercicios.map((ejercicio, index) => ({
        ...ejercicio,
        id: `${routineId}-exercise-${crypto.randomUUID()}`,
        orden: index + 1,
      })),
    };

    this._rutinas.update((rutinas) => [...rutinas, nuevaRutina]);
    return nuevaRutina;
  }

  private isOptionalInteger(value: number | undefined, minimum: number): boolean {
    return value === undefined || (Number.isInteger(value) && value >= minimum);
  }
}
