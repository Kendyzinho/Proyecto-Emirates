import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent {

  public flights: any[] = []

  public onSearchButton(criteria: { tripType: string, cabinClass: string, passengers: number, origin: string,
     destination: string, departure: string, return: string }): void {
    
    
    this.flights = [
      { airline: 'LATAM', route: `${criteria.origin} → ${criteria.destination}`, price: '$450' },
      { airline: 'Iberia', route: `${criteria.origin} → ${criteria.destination}`, price: '$520' },
      { airline: 'Sky Airline', route: `${criteria.origin} → ${criteria.destination}`, price: '$390' }
    ];

  }

}