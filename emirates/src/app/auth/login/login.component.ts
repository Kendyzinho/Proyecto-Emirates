import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private authService: AuthService) { }

  usuario = {
    email: '',
    password: '',
    recordar: false
  }

  procesarLogin() {
    // Validar credenciales usando el AuthService
    const usuarioEncontrado = this.authService.validarCredenciales(
      this.usuario.email,
      this.usuario.password
    );

    if (usuarioEncontrado) {
      // Login exitoso
      console.log('Login exitoso:', usuarioEncontrado);

      // Guardar sesión
      this.authService.login(usuarioEncontrado, this.usuario.recordar);

      alert('Bienvenido ' + usuarioEncontrado.nombre);

      //Redirección por rol
      if (usuarioEncontrado.rol === 'admin') {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/customer/dashboard']);
      }

    } else {
      alert('Email o contraseña incorrectos');
    }
  }

}