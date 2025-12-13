import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  currentUser: any;
  editedUser: any = {};

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.editedUser = { ...user };
      }
    });
  }

  onFotoChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validar que sea imagen
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen');
        return;
      }

      // Validar tamaño máximo (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no debe exceder 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editedUser.foto = e.target.result; // Base64
      };
      reader.readAsDataURL(file);
    }
  }

  saveChanges() {
    // Actualizar el usuario en el servicio
    this.authService.login(this.editedUser, true);
    alert('Cambios guardados correctamente');
    this.router.navigate(['/customer/profile']);
  }

  cancel() {
    this.router.navigate(['/customer/profile']);
  }

}
