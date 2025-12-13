import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightsService } from '../../core/services/flights.service';
import { CartService } from '../../core/services/cart.service';
import { Flight } from '../../core/models/flight.model';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css']
})
export class SearchFlightsComponent implements OnInit {

  vuelosDisponibles: Flight[] = [];
  searchCriteria = {
    origen: '',
    destino: '',
    fechaSalida: '',
    fechaRegreso: ''
  };

  ciudadesOrigen: string[] = [];
  ciudadesDestino: string[] = [];
  searchPerformed: boolean = false;

  constructor(
    public cartService: CartService,
    private flightsService: FlightsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Cargar ciudades para autocomplete
    this.ciudadesOrigen = this.flightsService.getOriginCities();
    this.ciudadesDestino = this.flightsService.getDestinationCities();

    // Obtener parámetros de búsqueda de la URL (si vienen desde el home)
    this.route.queryParams.subscribe(params => {
      if (params['origen'] || params['destino'] || params['fecha']) {
        this.searchCriteria.origen = params['origen'] || '';
        this.searchCriteria.destino = params['destino'] || '';
        this.searchCriteria.fechaSalida = params['fecha'] || '';
        this.buscarVuelos();
      } else {
        // Si no hay parámetros, mostrar todos los vuelos
        this.vuelosDisponibles = this.flightsService.getAllFlights();
      }
    });
  }

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
  }

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

  addToCart(vuelo: Flight) {
    this.cartService.addToCart(vuelo, 1);
    alert(`Vuelo ${vuelo.origen} → ${vuelo.destino} agregado al carrito`);
  }

  isInCart(vueloId: string): boolean {
    return this.cartService.cartItemsValue.some(item => item.vuelo.id === vueloId);
  }

  // Vuelo seleccionado para mostrar detalles
  selectedFlight: Flight | null = null;
  showFlightDetails: boolean = false;

  verDetallesVuelo(vuelo: Flight) {
    this.selectedFlight = vuelo;
    this.showFlightDetails = true;
  }

  cerrarDetalles() {
    this.showFlightDetails = false;
    this.selectedFlight = null;
  }
}
