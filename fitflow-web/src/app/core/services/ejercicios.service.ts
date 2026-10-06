import { Injectable, signal } from '@angular/core';
import { Ejercicio } from '../models/ejercicio.model';

const EJERCICIOS_INICIALES: readonly Ejercicio[] = [
  { id: 'exercise-squat', nombre: 'Sentadilla', videoUrl: 'https://www.youtube.com/results?search_query=sentadilla+tecnica' },
  { id: 'exercise-leg-press', nombre: 'Prensa de pierna', videoUrl: 'https://www.youtube.com/results?search_query=prensa+de+pierna+tecnica' },
  { id: 'exercise-pull-up', nombre: 'Dominadas', videoUrl: 'https://www.youtube.com/results?search_query=dominadas+tecnica' },
  { id: 'exercise-barbell-row', nombre: 'Remo con barra', videoUrl: 'https://www.youtube.com/results?search_query=remo+con+barra+tecnica' },
  { id: 'exercise-bench-press', nombre: 'Press de banca', videoUrl: 'https://www.youtube.com/results?search_query=press+de+banca+tecnica' },
];

@Injectable({ providedIn: 'root' })
export class EjerciciosService {
  private readonly _ejercicios = signal(EJERCICIOS_INICIALES);
  readonly ejercicios = this._ejercicios.asReadonly();

  getById(id: string): Ejercicio | undefined {
    return this._ejercicios().find((ejercicio) => ejercicio.id === id);
  }
}
