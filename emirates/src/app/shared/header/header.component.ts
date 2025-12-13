import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { Router } from '@angular/router';

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
  cartItemCount = 0;

  cities = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'];

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    // Suscribirse al Observable del usuario
    this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
      this.currentUser = user;
      // Actualizar roles
      this.isAdmin = user && user.rol === 'admin';
      this.isCliente = user && user.rol === 'cliente';
    });

    // Suscribirse al Observable del carrito para actualizar el badge
    this.cartService.cartItems.subscribe(items => {
      this.cartItemCount = this.cartService.getItemCount();
    });
  }

  toggleCart() {
    // Navegar al carrito en lugar de solo mostrar sidebar
    if (this.isCliente) {
      this.router.navigate(['/customer/cart']);
    }
  }

  toggleFlights() {
    this.showFlights = !this.showFlights;
  }

  logout() {
    this.authService.logout();
  }
}