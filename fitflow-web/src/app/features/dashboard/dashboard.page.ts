import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiClient } from '../../core/http/api-client';
import { Card } from "../../shared/ui/card/card";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.page.html',
  imports: [Card, RouterLink],
})
export class DashboardPage {
  private api = inject(ApiClient);
  readonly metrics = [
    { label: 'Clientes activos', value: '124', detail: 'Base actual de clientes', color: 'emerald' },
    { label: 'Rutinas activas', value: '32', detail: 'Planes disponibles', color: 'sky' },
    { label: 'Pagos hoy', value: '18', detail: 'Registros del día', color: 'amber' },
    { label: 'Asistencias hoy', value: '56', detail: 'Ingresos registrados', color: 'violet' },
  ];

  // Esto es solo prueba; luego lo cambiaremos por un endpoint real
  test() {
    this.api.get('/health').subscribe({
      next: (r) => console.log('API OK', r),
      error: (e) => console.log('API ERROR (normal si no existe /health)', e),
    });
  }
}
