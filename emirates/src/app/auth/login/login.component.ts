import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  usuario = {
    email: '',
    password: '',
    recordar: false
  }

  procesarLogin() {
    const usuarioEncontrado = this.authService.validarCredenciales(
      this.usuario.email,
      this.usuario.password
    );

    if (usuarioEncontrado) {
      console.log('Login exitoso:', usuarioEncontrado);
      this.authService.login(usuarioEncontrado, this.usuario.recordar);
      alert('Bienvenido ' + usuarioEncontrado.nombre);

      if (usuarioEncontrado.rol === 'admin') {
        this.router.navigate(['/admin/dashboard']);
      } else if (usuarioEncontrado.rol === 'cliente') {
        this.router.navigate(['/home']);
      }
    } else {
      alert('Email o contraseña incorrectos');
    }
  }
}