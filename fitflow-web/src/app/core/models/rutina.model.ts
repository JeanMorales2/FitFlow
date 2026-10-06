export type NivelRutina = 'Principiante' | 'Intermedio' | 'Avanzado';
export type EstadoRutina = 'Activa' | 'Inactiva';

export interface RutinaEjercicio {
  id: string;
  ejercicioId: string;
  orden: number;
  series?: number;
  repeticiones?: number;
  descansoSegundos?: number;
}

export interface Rutina {
  id: string;
  nombre: string;
  descripcion?: string;
  nivel: NivelRutina;
  estado: EstadoRutina;
  ejercicios: RutinaEjercicio[];
}

export interface CrearRutina {
  nombre: string;
  descripcion?: string;
  nivel: NivelRutina;
  ejercicios: Omit<RutinaEjercicio, 'id' | 'orden'>[];
}
