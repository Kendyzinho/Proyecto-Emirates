import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  persona = {

    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  
  procesarInformacion(){

    // Validar que las contraseñas coincidan
    if (this.persona.password !== this.persona.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Obtener usuarios existentes del localStorage
    const usuariosGuardados = localStorage.getItem('usuarios');
    let usuarios = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];

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
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    console.log('Usuario registrado exitosamente:', nuevoUsuario);
    alert('Registro exitoso');

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
