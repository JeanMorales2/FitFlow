import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private clientes: Cliente[] = [
    {
      nombre: 'Juan Perez',
      dni: '001-123456-0001A',
      estado: 'Activo'
    },
    {
      nombre: 'Maria Lopez',
      dni: '001-654321-0002B',
      estado: 'Activo'
    }
  ];

  getClientes() {
    return this.clientes;
  }

  agregarCliente(cliente: Cliente) {
    this.clientes.push(cliente);
  }
  actualizarCliente(index: number, clienteActualizado: Cliente) {
  this.clientes[index] = clienteActualizado;
  }

  eliminarCliente(index: number) {
  this.clientes.splice(index, 1);
  }
}