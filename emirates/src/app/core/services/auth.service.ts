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
    this.crearAdminPorDefecto();
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
    if (!usuariosGuardados) return null;

    let usuarios: any[] = [];

    try {
      // descifrar
      const decrypted = this.encryptionService.decrypt(usuariosGuardados);

      // Si decrypt devolvio un string, intentar parsearlo
      if (typeof decrypted === 'string') {
        usuarios = JSON.parse(decrypted);
      } 
      // Si decrypt devolvió un array, usarlo directamente
      else if (Array.isArray(decrypted)) {
        usuarios = decrypted;
      } 
      // Si no es array ni string, usar array vacío
      else {
        usuarios = [];
      }

    } catch (error) {
      console.error("Error al descifrar o leer usuarios:", error);
      return null;
    }

    // Buscar usuario por email + password exactos
    return usuarios.find((u: any) =>
      u.email === email && u.password === password
    ) || null;
  }

  private crearAdminPorDefecto() {
    let usuarios: any[] = [];

    const usuariosGuardados = localStorage.getItem('usuarios');

    if (usuariosGuardados) {
      try {
        usuarios = this.encryptionService.decrypt(usuariosGuardados) || [];
      } catch {
        usuarios = [];
      }
    }

    const adminExiste = usuarios.some(u => u.rol === 'admin');

    if (!adminExiste) {
      const adminDefault = {
        nombre: 'Ricardo',
        apellido: 'Valdivia',
        email: 'admin@email.com',
        password: 'admin123',
        rol: 'admin'
      };

      usuarios.push(adminDefault);

      localStorage.setItem('usuarios', this.encryptionService.encrypt(usuarios));

      console.log('✔ Administrador creado por defecto:', adminDefault);
    }
  }
  
}
