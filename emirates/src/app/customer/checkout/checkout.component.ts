import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { CartItem } from '../../core/models/flight.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItems: CartItem[] = [];
  total: number = 0;
  currentUser: any;

  // Datos del pasajero principal
  pasajeroData = {
    nombre: '',
    apellido: '',
    pasaporte: '',
    telefono: '',
    email: ''
  };

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Suscribirse al Observable del carrito
    this.cartService.cartItems.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();

      // Si el carrito está vacío, redirigir al home
      if (items.length === 0) {
        alert('Tu carrito está vacío');
        this.router.navigate(['/home']);
      }
    });

    // Suscribirse al Observable del usuario para pre-llenar datos
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.pasajeroData.nombre = user.nombre;
        this.pasajeroData.apellido = user.apellido;
        this.pasajeroData.email = user.email;
      }
    });
  }

  // Confirmar compra
  confirmarCompra() {
    // Validar que todos los campos estén llenos
    if (!this.pasajeroData.nombre || !this.pasajeroData.apellido ||
        !this.pasajeroData.pasaporte || !this.pasajeroData.telefono ||
        !this.pasajeroData.email) {
      alert('Por favor completa todos los campos del formulario');
      return;
    }

    // Crear objeto de reserva
    const reserva = {
      id: this.generateReservationId(),
      usuario: this.currentUser.email,
      vuelos: this.cartItems,
      pasajero: this.pasajeroData,
      total: this.total,
      fecha: new Date().toISOString(),
      estado: 'confirmada'
    };

    // Guardar reserva en localStorage
    this.guardarReserva(reserva);

    // Limpiar el carrito
    this.cartService.clearCart();

    // Mostrar confirmación y redirigir
    alert(`¡Compra confirmada!\n\nNúmero de reserva: ${reserva.id}\nTotal: $${this.total}\n\nGracias por tu compra.`);
    this.router.navigate(['/home']);
  }

  // Generar ID único para la reserva
  private generateReservationId(): string {
    return 'RES-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  // Guardar reserva en localStorage (sin cifrar para simplificar, pero se podría cifrar)
  private guardarReserva(reserva: any) {
    const reservasGuardadas = localStorage.getItem('reservas');
    let reservas = [];

    if (reservasGuardadas) {
      reservas = JSON.parse(reservasGuardadas);
    }

    reservas.push(reserva);
    localStorage.setItem('reservas', JSON.stringify(reservas));
  }

  // Cancelar y volver al carrito
  volverAlCarrito() {
    this.router.navigate(['/customer/cart']);
  }
}
