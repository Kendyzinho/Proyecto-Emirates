import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightsService } from '../../core/services/flights.service';
import { Flight } from '../../core/models/flight.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  totalFlights: number = 0;
  totalPassengers: number = 0;
  totalRevenue: number = 0;
  recentFlights: Flight[] = [];

  constructor(
    private flightsService: FlightsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    const flights = this.flightsService.getAllFlights();
    
    this.totalFlights = flights.length;
    this.totalPassengers = flights.reduce((sum: number, flight: Flight) => sum + flight.disponibles, 0);
    this.totalRevenue = flights.reduce((sum: number, flight: Flight) => sum + (flight.precio * flight.disponibles), 0);
    
    // Últimos 5 vuelos
    this.recentFlights = flights.slice(0, 5);
  }

  navigateToFlightsList(): void {
    this.router.navigate(['/admin/flights-list']);
  }

  navigateToAddFlight(): void {
    this.router.navigate(['/admin/flight-add']);
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

}
