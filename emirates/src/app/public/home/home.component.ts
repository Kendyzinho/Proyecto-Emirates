import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { FlightsService } from '../../core/services/flights.service';
import { Flight } from '../../core/models/flight.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Criterios de búsqueda
  searchCriteria = {
    origen: '',
    destino: '',
    fechaSalida: '',
    fechaRegreso: ''
  };

  // Vuelos mostrados (resultados de búsqueda o todos)
  vuelosDisponibles: Flight[] = [];

  // Ciudades para autocomplete
  ciudadesOrigen: string[] = [];
  ciudadesDestino: string[] = [];

  // Flag para saber si se hizo una búsqueda
  searchPerformed: boolean = false;

  constructor(
    public cartService: CartService,
    private flightsService: FlightsService
  ) {}

  ngOnInit() {
    // Cargar todos los vuelos al inicio
    this.vuelosDisponibles = this.flightsService.getAllFlights();

    // Cargar ciudades para los selectores
    this.ciudadesOrigen = this.flightsService.getOriginCities();
    this.ciudadesDestino = this.flightsService.getDestinationCities();
  }

  // Verificar si un vuelo ya está en el carrito
  isInCart(vueloId: string): boolean {
    return this.cartService.cartItemsValue.some(item => item.vuelo.id === vueloId);
  }

  // Buscar vuelos según criterios
  buscarVuelos() {
    if (!this.searchCriteria.origen && !this.searchCriteria.destino && !this.searchCriteria.fechaSalida) {
      alert('Por favor ingresa al menos un criterio de búsqueda');
      return;
    }

    this.searchPerformed = true;
    this.vuelosDisponibles = this.flightsService.searchFlights(
      this.searchCriteria.origen,
      this.searchCriteria.destino,
      this.searchCriteria.fechaSalida
    );

    if (this.vuelosDisponibles.length === 0) {
      alert('No se encontraron vuelos con los criterios especificados');
    }
  }

  // Limpiar búsqueda y mostrar todos los vuelos
  limpiarBusqueda() {
    this.searchCriteria = {
      origen: '',
      destino: '',
      fechaSalida: '',
      fechaRegreso: ''
    };
    this.searchPerformed = false;
    this.vuelosDisponibles = this.flightsService.getAllFlights();
  }

  // Agregar vuelo al carrito
  addToCart(vuelo: Flight) {
    this.cartService.addToCart(vuelo, 1);
    alert(`Vuelo ${vuelo.origen} → ${vuelo.destino} agregado al carrito`);
  }

}
