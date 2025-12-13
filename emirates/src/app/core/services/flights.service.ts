import { Injectable } from '@angular/core';
import { Flight, Pilot } from '../models/flight.model';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  private allFlights: Flight[] = [];

  constructor(private encryptionService: EncryptionService) {
    this.cargarVuelos();
  }

  // Cargar vuelos desde localStorage
  private cargarVuelos(): void {
    const vuelosGuardados = localStorage.getItem('vuelos');
    if (vuelosGuardados) {
      try {
        this.allFlights = this.encryptionService.decrypt(vuelosGuardados) || this.getVuelosDefault();
      } catch (error) {
        this.allFlights = this.getVuelosDefault();
      }
    } else {
      this.allFlights = this.getVuelosDefault();
      this.guardarVuelos();
    }
  }

  // Guardar vuelos en localStorage
  private guardarVuelos(): void {
    localStorage.setItem('vuelos', this.encryptionService.encrypt(this.allFlights));
  }

  // Vuelos por defecto con pilotos
  private getVuelosDefault(): Flight[] {
    return [
      {
        id: 'vuelo-1',
        origen: 'Dubai',
        destino: 'Madrid',
        fecha: '2025-01-15',
        hora: '14:30',
        duracion: '7h 30m',
        precio: 450,
        aerolinea: 'Emirates',
        disponibles: 20,
        piloto: {
          id: 'piloto-1',
          nombre: 'Carlos',
          apellido: 'Rodríguez',
          foto: 'assets/pilotos/piloto-1.jpg',
          licencia: 'ATPL-2025-001',
          horas_vuelo: 12000
        }
      },
      {
        id: 'vuelo-2',
        origen: 'Dubai',
        destino: 'París',
        fecha: '2025-01-20',
        hora: '09:15',
        duracion: '7h 00m',
        precio: 520,
        aerolinea: 'Emirates',
        disponibles: 15,
        piloto: {
          id: 'piloto-2',
          nombre: 'María',
          apellido: 'García',
          foto: 'assets/pilotos/piloto-2.jpg',
          licencia: 'ATPL-2025-002',
          horas_vuelo: 10500
        }
      },
      {
        id: 'vuelo-3',
        origen: 'Dubai',
        destino: 'Londres',
        fecha: '2025-01-18',
        hora: '16:45',
        duracion: '7h 15m',
        precio: 480,
        aerolinea: 'Emirates',
        disponibles: 25,
        piloto: {
          id: 'piloto-3',
          nombre: 'Juan',
          apellido: 'Martínez',
          foto: 'assets/pilotos/piloto-3.jpg',
          licencia: 'ATPL-2025-003',
          horas_vuelo: 15000
        }
      },
      {
        id: 'vuelo-4',
        origen: 'Dubai',
        destino: 'Nueva York',
        fecha: '2025-01-22',
        hora: '03:00',
        duracion: '14h 30m',
        precio: 850,
        aerolinea: 'Emirates',
        disponibles: 18,
        piloto: {
          id: 'piloto-4',
          nombre: 'Ahmed',
          apellido: 'Al-Mansouri',
          foto: 'assets/pilotos/piloto-4.jpg',
          licencia: 'ATPL-2025-004',
          horas_vuelo: 18000
        }
      }
    ];
  }

  // Obtener todos los vuelos
  getAllFlights(): Flight[] {
    return this.allFlights;
  }

  // Crear nuevo vuelo (ADMIN)
  createFlight(flight: Flight): Flight {
    const newId = 'vuelo-' + (this.allFlights.length + 1);
    const newFlight: Flight = { ...flight, id: newId };
    this.allFlights.push(newFlight);
    this.guardarVuelos();
    return newFlight;
  }

  // Actualizar vuelo (ADMIN)
  updateFlight(id: string, updatedFlight: Flight): boolean {
    const index = this.allFlights.findIndex(vuelo => vuelo.id === id);
    if (index !== -1) {
      this.allFlights[index] = { ...updatedFlight, id };
      this.guardarVuelos();
      return true;
    }
    return false;
  }

  // Eliminar vuelo (ADMIN)
  deleteFlight(id: string): boolean {
    const index = this.allFlights.findIndex(vuelo => vuelo.id === id);
    if (index !== -1) {
      this.allFlights.splice(index, 1);
      this.guardarVuelos();
      return true;
    }
    return false;
  }

  // Buscar vuelos por criterios
  searchFlights(origen?: string, destino?: string, fecha?: string): Flight[] {
    let results = this.allFlights;

    if (origen && origen.trim() !== '') {
      results = results.filter(vuelo =>
        vuelo.origen.toLowerCase().includes(origen.toLowerCase())
      );
    }

    if (destino && destino.trim() !== '') {
      results = results.filter(vuelo =>
        vuelo.destino.toLowerCase().includes(destino.toLowerCase())
      );
    }

    if (fecha && fecha.trim() !== '') {
      results = results.filter(vuelo => vuelo.fecha === fecha);
    }

    return results;
  }

  // Obtener vuelo por ID
  getFlightById(id: string): Flight | undefined {
    return this.allFlights.find(vuelo => vuelo.id === id);
  }

  // Obtener ciudades únicas de origen
  getOriginCities(): string[] {
    const cities = this.allFlights.map(vuelo => vuelo.origen);
    return [...new Set(cities)].sort();
  }

  // Obtener ciudades únicas de destino
  getDestinationCities(): string[] {
    const cities = this.allFlights.map(vuelo => vuelo.destino);
    return [...new Set(cities)].sort();
  }

  // Obtener destinos disponibles desde un origen específico
  getDestinationsFromOrigin(origen: string): string[] {
    const destinations = this.allFlights
      .filter(vuelo => vuelo.origen.toLowerCase() === origen.toLowerCase())
      .map(vuelo => vuelo.destino);
    return [...new Set(destinations)].sort();
  }
}
