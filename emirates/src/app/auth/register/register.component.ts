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

    console.log(this.persona)
  }
}
