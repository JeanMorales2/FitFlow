import { Ejercicio } from './ejercicio.model';

export interface Rutina {
  nombre: string;
  nivel: 'Principiante' | 'Intermedio' | 'Avanzado';
  categoria: string;
  ejercicios: Ejercicio[];
}