import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightsService } from '../../core/services/flights.service';
import { Flight } from '../../core/models/flight.model';

@Component({
  selector: 'app-admin-flights-list',
  templateUrl: './admin-flights-list.component.html',
  styleUrls: ['./admin-flights-list.component.css']
})
export class AdminFlightsListComponent implements OnInit {

  flights: Flight[] = [];
  filteredFlights: Flight[] = [];
  
  searchOrigen: string = '';
  searchDestino: string = '';
  searchFecha: string = '';

  constructor(
    private flightsService: FlightsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights(): void {
    this.flights = this.flightsService.getAllFlights();
    this.filterFlights();
  }

  filterFlights(): void {
    this.filteredFlights = this.flightsService.searchFlights(
      this.searchOrigen,
      this.searchDestino,
      this.searchFecha
    );
  }

  editFlight(flightId: string): void {
    this.router.navigate(['/admin/flight-edit', flightId]);
  }

  addNewFlight(): void {
    this.router.navigate(['/admin/flight-add']);
  }

  deleteFlight(flightId: string): void {
    if (confirm('¿Está seguro de que desea eliminar este vuelo?')) {
      this.flightsService.deleteFlight(flightId);
      this.loadFlights();
    }
  }

  clearFilters(): void {
    this.searchOrigen = '';
    this.searchDestino = '';
    this.searchFecha = '';
    this.filterFlights();
  }

}
