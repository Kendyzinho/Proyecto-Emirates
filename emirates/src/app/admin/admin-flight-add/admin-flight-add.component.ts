import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightsService } from '../../core/services/flights.service';
import { Flight } from '../../core/models/flight.model';

@Component({
  selector: 'app-admin-flight-add',
  templateUrl: './admin-flight-add.component.html',
  styleUrls: ['./admin-flight-add.component.css']
})
export class AdminFlightAddComponent implements OnInit {

  newFlight: Flight;

  constructor(
    private flightsService: FlightsService,
    private router: Router
  ) {
    this.newFlight = this.getEmptyFlight();
  }

  ngOnInit(): void {
  }

  getEmptyFlight(): Flight {
    return {
      id: '',
      origen: '',
      destino: '',
      fecha: '',
      hora: '',
      duracion: '',
      precio: 0,
      aerolinea: 'Emirates',
      disponibles: 0,
      piloto: {
        id: '',
        nombre: '',
        apellido: '',
        foto: '',
        licencia: '',
        horas_vuelo: 0
      }
    };
  }

  onFotoChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no debe exceder 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newFlight.piloto.foto = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveFlight(): void {
    if (!this.validateFlight()) {
      alert('Por favor completa todos los campos');
      return;
    }
    this.flightsService.createFlight(this.newFlight);
    alert('Vuelo creado exitosamente');
    this.router.navigate(['/admin/flights-list']);
  }

  validateFlight(): boolean {
    return this.newFlight.origen.trim() !== '' &&
           this.newFlight.destino.trim() !== '' &&
           this.newFlight.fecha !== '' &&
           this.newFlight.hora !== '' &&
           this.newFlight.duracion.trim() !== '' &&
           this.newFlight.precio > 0 &&
           this.newFlight.disponibles > 0 &&
           this.newFlight.piloto.nombre.trim() !== '' &&
           this.newFlight.piloto.apellido.trim() !== '' &&
           this.newFlight.piloto.licencia.trim() !== '';
  }

  cancel(): void {
    this.router.navigate(['/admin/flights-list']);
  }

}
