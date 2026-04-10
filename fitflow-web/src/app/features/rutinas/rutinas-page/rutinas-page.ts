import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Rutina } from '../../../core/models/rutina.model';

@Component({
  selector: 'app-rutinas-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rutinas-page.html',
  styleUrl: './rutinas-page.scss',
})
export class RutinasPage {
  showModal = false;

  rutinaForm: FormGroup;

  rutinas: Rutina[] = [
    {
      nombre: 'Rutina Pierna Inicial',
      nivel: 'Principiante',
      categoria: 'Pierna',
      ejercicios: [
        { nombre: 'Sentadilla', videoUrl: 'https://youtube.com/example1' },
        { nombre: 'Prensa', videoUrl: 'https://youtube.com/example2' }
      ]
    },
    {
      nombre: 'Rutina Espalda Intermedia',
      nivel: 'Intermedio',
      categoria: 'Espalda',
      ejercicios: [
        { nombre: 'Dominadas', videoUrl: 'https://youtube.com/example3' },
        { nombre: 'Remo con barra', videoUrl: 'https://youtube.com/example4' }
      ]
    }
  ];

  constructor(private fb: FormBuilder) {
    this.rutinaForm = this.fb.group({
      nombre: ['', Validators.required],
      nivel: ['Principiante', Validators.required],
      categoria: ['', Validators.required],
      ejercicios: ['', Validators.required]
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;

    this.rutinaForm.reset({
      nombre: '',
      nivel: 'Principiante',
      categoria: '',
      ejercicios: ''
    });
  }

  guardarRutina() {
    if (this.rutinaForm.invalid) {
      this.rutinaForm.markAllAsTouched();
      return;
    }

    const formValue = this.rutinaForm.value;

    const ejerciciosTexto = formValue.ejercicios ?? '';
    const ejerciciosArray = ejerciciosTexto
      .split(',')
      .map((ejercicio: string) => ejercicio.trim())
      .filter((ejercicio: string) => ejercicio.length > 0)
      .map((nombre: string) => ({
        nombre,
        videoUrl: ''
      }));

    const nuevaRutina: Rutina = {
      nombre: formValue.nombre ?? '',
      nivel: (formValue.nivel ?? 'Principiante') as 'Principiante' | 'Intermedio' | 'Avanzado',
      categoria: formValue.categoria ?? '',
      ejercicios: ejerciciosArray
    };

    this.rutinas.push(nuevaRutina);

    console.log('Rutina creada:', nuevaRutina);

    this.closeModal();
  }
}