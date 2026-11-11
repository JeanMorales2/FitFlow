import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientesService } from '../../../core/services/clientes.service';
import { Cliente } from '../../../core/models/cliente.model';

@Component({
  selector: 'app-clientes-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clientes-page.html',
  styleUrl: './clientes-page.scss'
})
export class ClientesPage {
  showModal = false;
  modoEdicion = false;
  clienteEditandoIndex: number | null = null;
  
  clienteForm: FormGroup;
  clientes: Cliente[] = [];

  constructor(
    private fb: FormBuilder,
    private clientesService: ClientesService
  ) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      dni: ['', Validators.required],
      estado: ['Activo']
    });
    this.clientes = this.clientesService.getClientes();
  }

  openModal() {
    this.showModal = true;
  }
  editarCliente(cliente: { nombre: string; dni: string; estado: string }, index: number) {
  this.showModal = true;
  this.modoEdicion = true;
  this.clienteEditandoIndex = index;

  this.clienteForm.patchValue({
    nombre: cliente.nombre,
    dni: cliente.dni,
    estado: cliente.estado
  });
  }

  eliminarCliente(index: number) {

  const confirmar = confirm('¿Seguro que deseas eliminar este cliente?');

  if (!confirmar) {
    return;
  }

  this.clientesService.eliminarCliente(index);
  }

  closeModal() {
  this.showModal = false;
  this.modoEdicion = false;
  this.clienteEditandoIndex = null;

  this.clienteForm.reset({
    nombre: '',
    dni: '',
    estado: 'Activo'
  });
}
  

  guardarCliente() {
  if (this.clienteForm.invalid) {
    this.clienteForm.markAllAsTouched();
    return;
  }

  const nuevoCliente: Cliente = {
    nombre: this.clienteForm.value.nombre ?? '',
    dni: this.clienteForm.value.dni ?? '',
    estado: this.clienteForm.value.estado ?? 'Activo'
  };

  if (this.modoEdicion && this.clienteEditandoIndex !== null) {
    this.clientesService.actualizarCliente(this.clienteEditandoIndex, nuevoCliente);
    console.log('Cliente actualizado:', nuevoCliente);
  } else {
    this.clientesService.agregarCliente(nuevoCliente);
    console.log('Cliente agregado:', nuevoCliente);
  }

  this.closeModal();
}
}