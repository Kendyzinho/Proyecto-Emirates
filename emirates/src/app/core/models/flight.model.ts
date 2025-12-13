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
}

export interface CartItem {
  id: string;
  vuelo: Flight;
  pasajeros: number;
  subtotal: number;
}
