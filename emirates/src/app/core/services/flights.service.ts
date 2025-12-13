import { Injectable } from '@angular/core';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  // Catálogo completo de vuelos
  private allFlights: Flight[] = [
    // Vuelos desde Dubai
    {
      id: 'vuelo-1',
      origen: 'Dubai',
      destino: 'Madrid',
      fecha: '2025-01-15',
      hora: '14:30',
      duracion: '7h 30m',
      precio: 450,
      aerolinea: 'Emirates',
      disponibles: 20
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
      disponibles: 15
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
      disponibles: 25
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
      disponibles: 18
    },
    {
      id: 'vuelo-5',
      origen: 'Dubai',
      destino: 'Barcelona',
      fecha: '2025-01-25',
      hora: '11:20',
      duracion: '7h 45m',
      precio: 465,
      aerolinea: 'Emirates',
      disponibles: 22
    },
    {
      id: 'vuelo-6',
      origen: 'Dubai',
      destino: 'Tokio',
      fecha: '2025-01-28',
      hora: '02:30',
      duracion: '9h 50m',
      precio: 720,
      aerolinea: 'Emirates',
      disponibles: 12
    },

    // Vuelos desde Abu Dhabi
    {
      id: 'vuelo-7',
      origen: 'Abu Dhabi',
      destino: 'Londres',
      fecha: '2025-01-25',
      hora: '22:00',
      duracion: '7h 45m',
      precio: 480,
      aerolinea: 'Emirates',
      disponibles: 10
    },
    {
      id: 'vuelo-8',
      origen: 'Abu Dhabi',
      destino: 'París',
      fecha: '2025-01-26',
      hora: '08:30',
      duracion: '7h 20m',
      precio: 510,
      aerolinea: 'Emirates',
      disponibles: 14
    },
    {
      id: 'vuelo-9',
      origen: 'Abu Dhabi',
      destino: 'Roma',
      fecha: '2025-01-27',
      hora: '15:10',
      duracion: '6h 30m',
      precio: 495,
      aerolinea: 'Emirates',
      disponibles: 16
    },
    {
      id: 'vuelo-10',
      origen: 'Abu Dhabi',
      destino: 'Sídney',
      fecha: '2025-01-30',
      hora: '21:45',
      duracion: '13h 15m',
      precio: 920,
      aerolinea: 'Emirates',
      disponibles: 8
    },

    // Vuelos desde Sharjah
    {
      id: 'vuelo-11',
      origen: 'Sharjah',
      destino: 'Mumbai',
      fecha: '2025-01-16',
      hora: '06:00',
      duracion: '3h 30m',
      precio: 280,
      aerolinea: 'Emirates',
      disponibles: 30
    },
    {
      id: 'vuelo-12',
      origen: 'Sharjah',
      destino: 'El Cairo',
      fecha: '2025-01-19',
      hora: '10:15',
      duracion: '4h 00m',
      precio: 320,
      aerolinea: 'Emirates',
      disponibles: 25
    },
    {
      id: 'vuelo-13',
      origen: 'Sharjah',
      destino: 'Estambul',
      fecha: '2025-01-21',
      hora: '13:40',
      duracion: '5h 15m',
      precio: 380,
      aerolinea: 'Emirates',
      disponibles: 20
    },

    // Vuelos desde Ajman
    {
      id: 'vuelo-14',
      origen: 'Ajman',
      destino: 'Dubái',
      fecha: '2025-01-17',
      hora: '07:30',
      duracion: '0h 45m',
      precio: 80,
      aerolinea: 'Emirates',
      disponibles: 40
    },
    {
      id: 'vuelo-15',
      origen: 'Ajman',
      destino: 'Doha',
      fecha: '2025-01-23',
      hora: '12:00',
      duracion: '1h 15m',
      precio: 150,
      aerolinea: 'Emirates',
      disponibles: 35
    }
  ];

  constructor() { }

  // Obtener todos los vuelos
  getAllFlights(): Flight[] {
    return this.allFlights;
  }

  // Buscar vuelos por criterios
  searchFlights(origen?: string, destino?: string, fecha?: string): Flight[] {
    let results = this.allFlights;

    // Filtrar por origen
    if (origen && origen.trim() !== '') {
      results = results.filter(vuelo =>
        vuelo.origen.toLowerCase().includes(origen.toLowerCase())
      );
    }

    // Filtrar por destino
    if (destino && destino.trim() !== '') {
      results = results.filter(vuelo =>
        vuelo.destino.toLowerCase().includes(destino.toLowerCase())
      );
    }

    // Filtrar por fecha
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
