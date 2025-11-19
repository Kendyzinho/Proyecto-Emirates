import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent {

  public title: String = "Emirates"
  public tripType = "roundtrip";
  public cabinClass = "economy";
  public passengers = 1;

  public passengerOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  public origin: String = "Origen";
  public destination: String = "Destino";
  public departureDate: String = "Fecha de salida";
  public returnDate: String = "Fecha de regreso";

  public originDropdown = false;
  public destinationDropdown = false;

  public filteredOrigins: { city: string, country: string, airport: string, code: string } [] = [];
  public filteredDestinations: { city: string, country: string, airport: string, code: string } [] = [];

  airports = [
  {
    city: "New Delhi",
    country: "India",
    airport: "Indira Gandhi International Airport",
    code: "DEL"
  },
  {
    city: "Ahmedabad",
    country: "India",
    airport: "Sardar Vallabhbhai Patel International Airport",
    code: "AMD"
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    airport: "Dubai International Airport",
    code: "DXB"
  }];

  public onTripTypeChange() {
    if (this.tripType === "oneway") {
      this.returnDate = "";
    }
  }

  public filterAirports(type: 'origin' | 'destination'): void {
    const query = (type === 'origin' ? this.origin : this.destination).toLowerCase();

    const results = this.airports.filter(a =>
      a.city.toLowerCase().includes(query) ||
      a.country.toLowerCase().includes(query) ||
      a.airport.toLowerCase().includes(query) ||
      a.code.toLowerCase().includes(query)
    );

    if (type === 'origin') {
      this.filteredOrigins = results;
      this.originDropdown = query.length > 0;
    } else {
      this.filteredDestinations = results;
      this.destinationDropdown = query.length > 0;
    }
  }

  public selectAirport(type: 'origin' | 'destination', airport: any) {
    const text = `${airport.city} (${airport.code})`;

    if (type === 'origin') {
      this.origin = text;
      this.originDropdown = false;
    } else {
      this.destination = text;
      this.destinationDropdown = false;
    }
  }

  public showDropdown(type: String): void {
    if (type == 'origin') this.originDropdown = true
    else this.destinationDropdown = true
  }

  public search() {
    console.log({
      tripType: this.tripType,
      cabinClass: this.cabinClass,
      passengers: this.passengers,
      origin: this.origin,
      destination: this.destination,
      departure: this.departureDate,
      return: this.returnDate
    });
  }

}
