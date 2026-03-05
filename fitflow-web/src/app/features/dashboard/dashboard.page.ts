import { Component, inject } from '@angular/core';
import { ApiClient } from '../../core/http/api-client';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
})
export class DashboardPage {
  private api = inject(ApiClient);

  // Esto es solo prueba; luego lo cambiaremos por un endpoint real
  test() {
    this.api.get('/health').subscribe({
      next: (r) => console.log('API OK', r),
      error: (e) => console.log('API ERROR (normal si no existe /health)', e),
    });
  }
}