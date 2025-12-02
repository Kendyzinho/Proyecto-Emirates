import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private encryptionService: EncryptionService) {
    const storedUser = localStorage.getItem('usuarioActual') || sessionStorage.getItem('usuarioActual');
    let user = null;
    if (storedUser) {
      try {
        user = this.encryptionService.decrypt(storedUser);
      } catch (error) {
        console.error('Error al descifrar usuario actual:', error);
      }
    }
    this.currentUserSubject = new BehaviorSubject<any>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Verificar si el usuario actual es admin
  public isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user && user.rol === 'admin';
  }

  // Verificar si el usuario actual es cliente
  public isCliente(): boolean {
    const user = this.currentUserSubject.value;
    return user && user.rol === 'cliente';
  }

  // Obtener el rol del usuario actual
  public getCurrentUserRole(): string | null {
    const user = this.currentUserSubject.value;
    return user ? user.rol : null;
  }

  login(user: any, recordar: boolean = false) {
    const encryptedUser = this.encryptionService.encrypt(user);
    if (recordar) {
      localStorage.setItem('usuarioActual', encryptedUser);
    } else {
      sessionStorage.setItem('usuarioActual', encryptedUser);
    }
    this.currentUserSubject.next(user);
  }

  logout() {
    localStorage.removeItem('usuarioActual');
    sessionStorage.removeItem('usuarioActual');
    this.currentUserSubject.next(null);
  }

  // Método para validar credenciales
  validarCredenciales(email: string, password: string): any {
    const usuariosGuardados = localStorage.getItem('usuarios');

    if (!usuariosGuardados) {
      return null;
    }

    let usuarios = [];
    try {
      usuarios = this.encryptionService.decrypt(usuariosGuardados);
      if (!usuarios) {
        try {
          usuarios = JSON.parse(usuariosGuardados);
        } catch (e) {
          usuarios = [];
        }
      }
    } catch (error) {
      console.error('Error al descifrar usuarios', error);
      return null;
    }

    // Buscar usuario con email y password coincidentes
    const usuarioEncontrado = usuarios.find((u: any) =>
      u.email === email && u.password === password
    );

    return usuarioEncontrado || null;
  }
}
