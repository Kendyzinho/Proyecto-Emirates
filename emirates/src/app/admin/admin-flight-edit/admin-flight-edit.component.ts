import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightsService } from '../../core/services/flights.service';
import { Flight } from '../../core/models/flight.model';

@Component({
  selector: 'app-admin-flight-edit',
  templateUrl: './admin-flight-edit.component.html',
  styleUrls: ['./admin-flight-edit.component.css']
})
export class AdminFlightEditComponent implements OnInit {

  flightId: string | null = null;
  editedFlight: Flight | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightsService: FlightsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.flightId = params['id'];
      if (this.flightId) {
        this.loadFlight();
      }
    });
  }

  loadFlight(): void {
    if (this.flightId) {
      const flight = this.flightsService.getFlightById(this.flightId);
      if (flight) {
        this.editedFlight = JSON.parse(JSON.stringify(flight));
      } else {
        alert('Vuelo no encontrado');
        this.router.navigate(['/admin/flights-list']);
      }
    }
  }

  onFotoChange(event: any): void {
    const file = event.target.files[0];
    if (file && this.editedFlight) {
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
        if (this.editedFlight) {
          this.editedFlight.piloto.foto = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  saveFlight(): void {
    if (!this.validateFlight()) {
      alert('Por favor completa todos los campos');
      return;
    }
    if (this.flightId && this.editedFlight) {
      this.flightsService.updateFlight(this.flightId, this.editedFlight);
      alert('Vuelo actualizado exitosamente');
      this.router.navigate(['/admin/flights-list']);
    }
  }

  validateFlight(): boolean {
    if (!this.editedFlight) return false;
    return this.editedFlight.origen.trim() !== '' &&
           this.editedFlight.destino.trim() !== '' &&
           this.editedFlight.fecha !== '' &&
           this.editedFlight.hora !== '' &&
           this.editedFlight.duracion.trim() !== '' &&
           this.editedFlight.precio > 0 &&
           this.editedFlight.disponibles > 0 &&
           this.editedFlight.piloto.nombre.trim() !== '' &&
           this.editedFlight.piloto.apellido.trim() !== '' &&
           this.editedFlight.piloto.licencia.trim() !== '';
  }

  cancel(): void {
    this.router.navigate(['/admin/flights-list']);
  }

}
