export interface Pilot {
  id: string;
  nombre: string;
  apellido: string;
  foto: string;
  licencia: string;
  horas_vuelo: number;
}

export interface Flight {
  id: string;
  origen: string;
  destino: string;
  fecha: string;
  hora: string;
  duracion: string;
  precio: number;
  aerolinea: string;
  disponibles: number;
  piloto: Pilot;
}

export interface CartItem {
  id: string;
  vuelo: Flight;
  pasajeros: number;
  subtotal: number;
}
