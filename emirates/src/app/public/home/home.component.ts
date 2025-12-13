import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightsService } from '../../core/services/flights.service';

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

  // Ciudades para autocomplete
  ciudadesOrigen: string[] = [];
  ciudadesDestino: string[] = [];

  constructor(
    private flightsService: FlightsService,
    private router: Router
  ) {}

  ngOnInit() {
    // Cargar ciudades para los selectores
    this.ciudadesOrigen = this.flightsService.getOriginCities();
    this.ciudadesDestino = this.flightsService.getDestinationCities();
  }

  // Buscar vuelos según criterios - redirige a la página de vuelos
  buscarVuelos() {
    // Navegar a la página de búsqueda de vuelos con los parámetros
    this.router.navigate(['/flights'], {
      queryParams: {
        origen: this.searchCriteria.origen || null,
        destino: this.searchCriteria.destino || null,
        fecha: this.searchCriteria.fechaSalida || null
      }
    });
  }

}
