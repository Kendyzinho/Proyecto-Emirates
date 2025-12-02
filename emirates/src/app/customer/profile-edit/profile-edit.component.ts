import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { EncryptionService } from '../../core/services/encryption.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  currentUser: any = null;
  editedUser: any = {
    nombre: '',
    apellido: '',
    email: ''
  };

  constructor(
    private authService: AuthService,
    private encryptionService: EncryptionService,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener el usuario actual del Observable
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.currentUser = user;
        // Copiar datos al formulario de edición
        this.editedUser = {
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email
        };
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  saveChanges() {
    // Validar que los campos no estén vacíos
    if (!this.editedUser.nombre || !this.editedUser.apellido || !this.editedUser.email) {
      alert('Todos los campos son obligatorios');
      return;
    }

    // Obtener todos los usuarios del localStorage
    const usuariosGuardados = localStorage.getItem('usuarios');
    if (!usuariosGuardados) {
      alert('Error al cargar usuarios');
      return;
    }

    let usuarios = [];
    try {
      usuarios = this.encryptionService.decrypt(usuariosGuardados);
    } catch (error) {
      console.error('Error al descifrar usuarios', error);
      alert('Error al procesar datos');
      return;
    }

    // Buscar el índice del usuario actual
    const userIndex = usuarios.findIndex((u: any) => u.email === this.currentUser.email);

    if (userIndex === -1) {
      alert('Usuario no encontrado');
      return;
    }

    // Actualizar los datos del usuario (manteniendo password y rol)
    usuarios[userIndex] = {
      ...usuarios[userIndex],
      nombre: this.editedUser.nombre,
      apellido: this.editedUser.apellido,
      email: this.editedUser.email
    };

    // Guardar en localStorage cifrado
    localStorage.setItem('usuarios', this.encryptionService.encrypt(usuarios));

    // Actualizar la sesión actual con los nuevos datos
    const usuarioActualizado = usuarios[userIndex];
    this.authService.login(usuarioActualizado, !!localStorage.getItem('usuarioActual'));

    alert('Perfil actualizado exitosamente');
    this.router.navigate(['/customer/profile']);
  }

  cancel() {
    this.router.navigate(['/customer/profile']);
  }

}
