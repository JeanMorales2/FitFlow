import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../http/api-client';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesApiService {
  constructor(private apiClient: ApiClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.apiClient.get<Cliente[]>('/api/clientes');
  }

  crearCliente(cliente: Cliente): Observable<Cliente> {
    return this.apiClient.post<Cliente>('/api/clientes', cliente);
  }

  actualizarCliente(index: number, cliente: Cliente): Observable<Cliente> {
    return this.apiClient.put<Cliente>(`/api/clientes/${index}`, cliente);
  }

  eliminarCliente(index: number): Observable<void> {
    return this.apiClient.delete<void>(`/api/clientes/${index}`);
  }
}