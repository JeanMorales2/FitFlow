import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EjerciciosService } from '../../../core/services/ejercicios.service';
import { RutinasService } from '../../../core/services/rutinas.service';

@Component({
  selector: 'app-rutina-detalle-page', standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './rutina-detalle-page.html', styleUrl: './rutina-detalle-page.scss',
})
export class RutinaDetallePage {
  private readonly route = inject(ActivatedRoute);
  private readonly rutinasService = inject(RutinasService);
  readonly ejerciciosService = inject(EjerciciosService);

  readonly rutinaId = this.route.snapshot.paramMap.get('id')?.trim() ?? '';
  readonly rutinaSeleccionada = computed(() => this.rutinaId ? this.rutinasService.getById(this.rutinaId) : undefined);
}
