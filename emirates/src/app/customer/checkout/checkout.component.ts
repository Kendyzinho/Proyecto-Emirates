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
    // Suscribirse al Observable del usuario para pre-llenar datos
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.pasajeroData.nombre = user.nombre;
        this.pasajeroData.apellido = user.apellido;
        this.pasajeroData.email = user.email;
      }
    });

    // Suscribirse al Observable del carrito
    this.cartService.cartItems.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });

    // Verificar si el carrito está vacío al cargar el componente
    if (this.cartService.cartItemsValue.length === 0) {
      alert('Tu carrito está vacío');
      this.router.navigate(['/home']);
    }
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

    // Validar que el teléfono solo contenga números (y opcionalmente +, espacios, guiones)
    const telefonoRegex = /^[\d\s\-\+]+$/;
    if (!telefonoRegex.test(this.pasajeroData.telefono)) {
      alert('El teléfono solo debe contener números, espacios, guiones o el símbolo +');
      return;
    }

    // Guardar el total ANTES de limpiar el carrito
    const totalFinal = this.total;

    // Crear objeto de reserva
    const reserva = {
      id: this.generateReservationId(),
      usuario: this.currentUser.email,
      vuelos: this.cartItems,
      pasajero: this.pasajeroData,
      total: totalFinal,
      fecha: new Date().toISOString(),
      estado: 'confirmada'
    };

    // Guardar reserva en localStorage
    this.guardarReserva(reserva);

    // Limpiar el carrito
    this.cartService.clearCart();

    // Mostrar confirmación y redirigir (usando totalFinal en lugar de this.total)
    alert(`¡Compra confirmada!\n\nNúmero de reserva: ${reserva.id}\nTotal: $${totalFinal}\n\nGracias por tu compra.`);
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
