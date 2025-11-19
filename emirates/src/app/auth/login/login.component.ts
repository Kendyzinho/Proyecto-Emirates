import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router) {}

  usuario = {
    email: '',
    password: '',
    recordar: false
  }
  
  procesarLogin(){
    
    // Obtener usuarios del localStorage
    const usuariosGuardados = localStorage.getItem('usuarios');
    
    if (!usuariosGuardados) {
      alert('No hay usuarios registrados');
      return;
    }

    const usuarios = JSON.parse(usuariosGuardados);

    // Buscar usuarios con emails y passwords coincidentes
    const usuarioEncontrado = usuarios.find((u: any) =>
      u.email === this.usuario.email && u.password === this.usuario.password
    );


    if (usuarioEncontrado) {
      // Login exitoso
      console.log('Login exitoso:', usuarioEncontrado);

      // Guardar sesión si marcó "recordar"
      if (this.usuario.recordar) {
        localStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado));
      } else {
        sessionStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado));
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