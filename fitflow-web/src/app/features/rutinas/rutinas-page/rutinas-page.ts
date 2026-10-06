import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NivelRutina, Rutina } from '../../../core/models/rutina.model';
import { EjerciciosService } from '../../../core/services/ejercicios.service';
import { RutinasService } from '../../../core/services/rutinas.service';

type EjercicioForm = FormGroup<{
  ejercicioId: FormControl<string>;
  series: FormControl<number | null>;
  repeticiones: FormControl<number | null>;
  descansoSegundos: FormControl<number | null>;
}>;

@Component({
  selector: 'app-rutinas-page', standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './rutinas-page.html', styleUrl: './rutinas-page.scss',
})
export class RutinasPage {
  private readonly rutinasService = inject(RutinasService);
  private readonly ejerciciosService = inject(EjerciciosService);

  @ViewChild('nombreInput') private nombreInput?: ElementRef<HTMLInputElement>;
  @ViewChild('openModalButton') private openModalButton?: ElementRef<HTMLButtonElement>;

  readonly rutinas = this.rutinasService.rutinas;
  readonly ejerciciosCatalogo = this.ejerciciosService.ejercicios;
  showModal = false;
  duplicateExerciseError = false;

  readonly rutinaForm = new FormGroup({
    nombre: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    nivel: new FormControl<NivelRutina>('Principiante', { nonNullable: true, validators: [Validators.required] }),
    descripcion: new FormControl('', { nonNullable: true }),
    ejercicios: new FormArray<EjercicioForm>([], { validators: [Validators.required, Validators.minLength(1)] }),
  });

  get ejerciciosFormArray(): FormArray<EjercicioForm> { return this.rutinaForm.controls.ejercicios; }

  openModal(): void {
    this.showModal = true;
    this.addEjercicio();
    queueMicrotask(() => this.nombreInput?.nativeElement.focus());
  }

  closeModal(): void {
    this.showModal = false;
    this.duplicateExerciseError = false;
    this.rutinaForm.reset({ nombre: '', nivel: 'Principiante', descripcion: '' });
    this.ejerciciosFormArray.clear();
    queueMicrotask(() => this.openModalButton?.nativeElement.focus());
  }

  addEjercicio(): void {
    this.ejerciciosFormArray.push(new FormGroup({
      ejercicioId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      series: new FormControl<number | null>(null, [Validators.min(1), Validators.pattern(/^\d+$/)]),
      repeticiones: new FormControl<number | null>(null, [Validators.min(1), Validators.pattern(/^\d+$/)]),
      descansoSegundos: new FormControl<number | null>(null, [Validators.min(0)]),
    }));
  }

  removeEjercicio(index: number): void { this.ejerciciosFormArray.removeAt(index); }

  guardarRutina(): void {
    this.duplicateExerciseError = this.hasDuplicateExercises();
    if (this.rutinaForm.invalid || this.duplicateExerciseError) {
      this.rutinaForm.markAllAsTouched();
      return;
    }
    const value = this.rutinaForm.getRawValue();
    this.rutinasService.create({
      nombre: value.nombre, nivel: value.nivel, descripcion: value.descripcion,
      ejercicios: value.ejercicios.map(({ ejercicioId, series, repeticiones, descansoSegundos }) => ({
        ejercicioId, series: series ?? undefined, repeticiones: repeticiones ?? undefined,
        descansoSegundos: descansoSegundos ?? undefined,
      })),
    });
    this.closeModal();
  }

  exerciseSummary(rutina: Rutina): string {
    return `${rutina.ejercicios.length} ${rutina.ejercicios.length === 1 ? 'ejercicio' : 'ejercicios'}`;
  }

  isExerciseSelected(exerciseId: string, currentIndex: number): boolean {
    return this.ejerciciosFormArray.controls.some((control, index) =>
      index !== currentIndex && control.controls.ejercicioId.value === exerciseId);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void { if (this.showModal) this.closeModal(); }

  private hasDuplicateExercises(): boolean {
    const ids = this.ejerciciosFormArray.controls.map((control) => control.controls.ejercicioId.value).filter(Boolean);
    return new Set(ids).size !== ids.length;
  }
}
