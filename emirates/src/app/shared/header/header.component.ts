import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showCart = false;
  showFlights = false;
  isLoggedIn = false;
  currentUser: any;
  isAdmin = false;
  isCliente = false;

  cities = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
      this.currentUser = user;
      // Actualizar roles
      this.isAdmin = user && user.rol === 'admin';
      this.isCliente = user && user.rol === 'cliente';
    });
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  toggleFlights() {
    this.showFlights = !this.showFlights;
  }

  logout() {
    this.authService.logout();
  }
}