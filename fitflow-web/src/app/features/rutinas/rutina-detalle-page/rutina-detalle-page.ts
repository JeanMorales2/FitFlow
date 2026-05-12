import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rutina } from '../../../core/models/rutina.model';

@Component({
  selector: 'app-rutina-detalle-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rutina-detalle-page.html',
  styleUrl: './rutina-detalle-page.scss',
})
export class RutinaDetallePage {
  rutinaId: number | null = null;

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

  rutinaSeleccionada: Rutina | undefined;

  constructor(private route: ActivatedRoute) {
    this.rutinaId = Number(this.route.snapshot.paramMap.get('id'));
    this.rutinaSeleccionada = this.rutinas[this.rutinaId];
  }
}