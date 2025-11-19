import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showCart = false;
  showFlights = false;
  
  cities = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'];

  toggleCart() {
    this.showCart = !this.showCart;
  }

  toggleFlights() {
    this.showFlights = !this.showFlights;
  }
}