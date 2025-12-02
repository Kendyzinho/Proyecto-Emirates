import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptionService } from '../../core/services/encryption.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private encryptionService: EncryptionService) { }

  usuario = {
    email: '',
    password: '',
    recordar: false
  }

  procesarLogin() {

    // Obtener usuarios del localStorage
    const usuariosGuardados = localStorage.getItem('usuarios');

    if (!usuariosGuardados) {
      alert('No hay usuarios registrados');
      return;
    }

    let usuarios = [];
    try {
      usuarios = this.encryptionService.decrypt(usuariosGuardados);
      if (!usuarios) {
        // Fallback por si acaso falla o es data vieja no encriptada (opcional, pero mejor prevenir)
        try {
          usuarios = JSON.parse(usuariosGuardados);
        } catch (e) {
          usuarios = [];
        }
      }
    } catch (error) {
      console.error('Error al descifrar usuarios', error);
      usuarios = [];
    }

    // Buscar usuarios con emails y passwords coincidentes
    const usuarioEncontrado = usuarios.find((u: any) =>
      u.email === this.usuario.email && u.password === this.usuario.password
    );


    if (usuarioEncontrado) {
      // Login exitoso
      console.log('Login exitoso:', usuarioEncontrado);

      // Guardar sesión si marcó "recordar"
      if (this.usuario.recordar) {
        localStorage.setItem('usuarioActual', this.encryptionService.encrypt(usuarioEncontrado));
      } else {
        sessionStorage.setItem('usuarioActual', this.encryptionService.encrypt(usuarioEncontrado));
      }

      alert('Bienvenido ' + usuarioEncontrado.nombre);
      // Redirigir al home
      this.router.navigate(['/home']);
    } else {
      // Login fallido
      alert('Email o contraseña incorrectos');
    }
  }

}