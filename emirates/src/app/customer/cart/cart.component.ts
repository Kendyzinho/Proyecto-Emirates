import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/flight.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(
    public cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    // Suscribirse al Observable del carrito
    this.cartService.cartItems.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  // Actualizar cantidad de pasajeros
  updateQuantity(itemId: string, pasajeros: number) {
    // Encontrar el item en el carrito
    const item = this.cartItems.find(i => i.id === itemId);

    if (!item) {
      return;
    }

    // Validar que sea un número positivo
    if (pasajeros < 1) {
      alert('Debe haber al menos 1 pasajero');
      item.pasajeros = 1;
      this.cartService.updatePassengers(itemId, 1);
      return;
    }

    // Validar que no exceda los asientos disponibles
    if (pasajeros > item.vuelo.disponibles) {
      alert(`Este vuelo solo tiene ${item.vuelo.disponibles} asientos disponibles`);
      item.pasajeros = item.vuelo.disponibles;
      this.cartService.updatePassengers(itemId, item.vuelo.disponibles);
      return;
    }

    // Actualizar si todo está bien
    this.cartService.updatePassengers(itemId, pasajeros);
  }

  // Eliminar item del carrito
  removeItem(itemId: string) {
    if (confirm('¿Estás seguro de eliminar este vuelo del carrito?')) {
      this.cartService.removeFromCart(itemId);
    }
  }

  // Limpiar todo el carrito
  clearCart() {
    if (confirm('¿Estás seguro de vaciar todo el carrito?')) {
      this.cartService.clearCart();
    }
  }

  // Ir al checkout
  goToCheckout() {
    if (this.cartItems.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    this.router.navigate(['/customer/checkout']);
  }

  // Continuar comprando
  continueShopping() {
    this.router.navigate(['/home']);
  }

}
