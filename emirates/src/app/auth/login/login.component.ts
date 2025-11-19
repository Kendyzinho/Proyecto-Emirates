import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario = {
    email: '',
    password: '',
    recordar: false
  }
  
  procesarLogin(){
    console.log(this.usuario);
  }
}