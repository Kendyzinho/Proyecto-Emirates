import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  currentUser: any = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Suscribirse al Observable para obtener el usuario actual
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.currentUser = user;
      } else {
        // Si no hay usuario, redirigir al login
        this.router.navigate(['/login']);
      }
    });
  }

  editProfile() {
    this.router.navigate(['/customer/profile/edit']);
  }

  goBack() {
    this.router.navigate(['/customer/home']);
  }

}
