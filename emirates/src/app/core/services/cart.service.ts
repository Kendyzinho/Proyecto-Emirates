import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EncryptionService } from './encryption.service';
import { CartItem, Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Observable para el carrito (como el currentUser en AuthService)
  private cartItemsSubject: BehaviorSubject<CartItem[]>;
  public cartItems: Observable<CartItem[]>;

  constructor(private encryptionService: EncryptionService) {
    // Cargar carrito del localStorage al iniciar
    const storedCart = localStorage.getItem('carrito');
    let items: CartItem[] = [];

    if (storedCart) {
      try {
        items = this.encryptionService.decrypt(storedCart);
      } catch (error) {
        console.error('Error al descifrar carrito:', error);
        items = [];
      }
    }

    // Inicializar el BehaviorSubject con los items cargados
    this.cartItemsSubject = new BehaviorSubject<CartItem[]>(items);
    this.cartItems = this.cartItemsSubject.asObservable();
  }

  // Obtener el valor actual del carrito
  public get cartItemsValue(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  // Agregar vuelo al carrito
  addToCart(vuelo: Flight, pasajeros: number = 1) {
    const currentItems = this.cartItemsValue;

    // Verificar si el vuelo ya está en el carrito
    const existingItemIndex = currentItems.findIndex(item => item.vuelo.id === vuelo.id);

    if (existingItemIndex !== -1) {
      // Si ya existe, actualizar cantidad de pasajeros
      currentItems[existingItemIndex].pasajeros += pasajeros;
      currentItems[existingItemIndex].subtotal = currentItems[existingItemIndex].pasajeros * vuelo.precio;
    } else {
      // Si no existe, agregar nuevo item
      const newItem: CartItem = {
        id: this.generateId(),
        vuelo: vuelo,
        pasajeros: pasajeros,
        subtotal: pasajeros * vuelo.precio
      };
      currentItems.push(newItem);
    }

    this.updateCart(currentItems);
  }

  // Eliminar item del carrito
  removeFromCart(itemId: string) {
    const currentItems = this.cartItemsValue;
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    this.updateCart(updatedItems);
  }

  // Actualizar cantidad de pasajeros
  updatePassengers(itemId: string, pasajeros: number) {
    const currentItems = this.cartItemsValue;
    const itemIndex = currentItems.findIndex(item => item.id === itemId);

    if (itemIndex !== -1 && pasajeros > 0) {
      currentItems[itemIndex].pasajeros = pasajeros;
      currentItems[itemIndex].subtotal = pasajeros * currentItems[itemIndex].vuelo.precio;
      this.updateCart(currentItems);
    }
  }

  // Limpiar todo el carrito
  clearCart() {
    this.updateCart([]);
  }

  // Obtener total del carrito
  getTotal(): number {
    return this.cartItemsValue.reduce((total, item) => total + item.subtotal, 0);
  }

  // Obtener cantidad total de items
  getItemCount(): number {
    return this.cartItemsValue.reduce((count, item) => count + item.pasajeros, 0);
  }

  // Método privado para actualizar el carrito
  private updateCart(items: CartItem[]) {
    // Guardar en localStorage cifrado
    localStorage.setItem('carrito', this.encryptionService.encrypt(items));

    // ¡CLAVE! Emitir al Observable para que todos los componentes se enteren
    this.cartItemsSubject.next(items);
  }

  // Generar ID único para items del carrito
  private generateId(): string {
    return 'item-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }
}
