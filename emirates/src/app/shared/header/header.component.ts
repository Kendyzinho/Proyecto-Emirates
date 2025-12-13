import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showCart: boolean = false;
  showFlights: boolean = false;
  showProfileMenu: boolean = false;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isCliente: boolean = false;
  currentUser: any = null;
  cartItemCount: number = 0;

  cities = ['Dubai', 'Abu Dhabi', 'Doha', 'Delhi'];

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Suscribirse al Observable del usuario
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
      this.isAdmin = this.authService.isAdmin();
      this.isCliente = this.authService.isCliente();
    });

    // Suscribirse al Observable del carrito para actualizar el badge
    this.cartService.cartItems.subscribe(items => {
      this.cartItemCount = this.cartService.getItemCount();
    });
  }

  toggleFlights(): void {
    this.showFlights = !this.showFlights;
  }

  toggleCart(): void {
    // Navegar al carrito en lugar de solo mostrar sidebar
    if (this.isCliente) {
      this.router.navigate(['/customer/cart']);
    }
  }

  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
  }

  logout(): void {
    this.authService.logout();
    this.showProfileMenu = false;
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any): void {
    const profileDropdown = event.target.closest('.profile-dropdown');
    if (!profileDropdown && this.showProfileMenu) {
      this.showProfileMenu = false;
    }
  }

}