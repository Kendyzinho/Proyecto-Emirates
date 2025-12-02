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

      // Usar el método login del AuthService que maneja el cifrado
      this.authService.login(usuarioEncontrado, this.usuario.recordar);

      alert('Bienvenido ' + usuarioEncontrado.nombre);
      // Redirigir al home
      this.router.navigate(['/home']);
    } else {
      // Login fallido
      alert('Email o contraseña incorrectos');
    }
  }

}