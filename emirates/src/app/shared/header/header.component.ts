import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isCliente: boolean = false;
  currentUser: any = null;

  showFlights: boolean = false;
  showCart: boolean = false;
  showProfileMenu: boolean = false;

  cities = ['Dubai', 'Abu Dhabi', 'Doha', 'Delhi'];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
      this.isAdmin = this.authService.isAdmin();
      this.isCliente = this.authService.isCliente();
    });
  }

  toggleFlights() {
    this.showFlights = !this.showFlights;
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  logout() {
    this.authService.logout();
    this.showProfileMenu = false;
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any) {
    const profileDropdown = event.target.closest('.profile-dropdown');
    if (!profileDropdown && this.showProfileMenu) {
      this.showProfileMenu = false;
    }
  }

}