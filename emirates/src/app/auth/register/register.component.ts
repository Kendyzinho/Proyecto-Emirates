import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptionService } from '../../core/services/encryption.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private encryptionService: EncryptionService,
    private router: Router,
    private authService: AuthService
  ) { }


  persona = {

    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  procesarInformacion() {

    // Validar que las contraseñas coincidan
    if (this.persona.password !== this.persona.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Obtener usuarios existentes del localStorage
    // Obtener usuarios existentes del localStorage
    const usuariosGuardados = localStorage.getItem('usuarios');
    let usuarios = [];

    if (usuariosGuardados) {
      try {
        usuarios = this.encryptionService.decrypt(usuariosGuardados) || [];
      } catch (e) {
        usuarios = [];
      }
    }

    // Verificar si el email ya está registrado
    const emailExiste = usuarios.some((u: any) => u.email === this.persona.email);
    if (emailExiste) {
      alert('Este email ya está registrado');
      return;
    }

    // Agregar nuevo usuario (sin guardar confirmPassword)
    const nuevoUsuario = {
      nombre: this.persona.nombre,
      apellido: this.persona.apellido,
      email: this.persona.email,
      password: this.persona.password
    };
    usuarios.push(nuevoUsuario);

    // Guardar en localStorage
    localStorage.setItem('usuarios', this.encryptionService.encrypt(usuarios));
    console.log('Usuario registrado exitosamente:', nuevoUsuario);

    // Auto-login (sin recordar por defecto en el registro)
    this.authService.login(nuevoUsuario, false);

    alert('Registro exitoso');
    this.router.navigate(['/home']);

    // Limpiar formulario
    this.persona = {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }
}
