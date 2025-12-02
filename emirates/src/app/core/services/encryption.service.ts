import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  // Clave secreta para cifrado (en producción, esto debería estar en variables de entorno)
  private secretKey = 'Emirates-SecretKey-2024';

  constructor() { }

  // Cifrar datos
  encrypt(data: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
  }

  // Descifrar datos
  decrypt(encryptedData: string): any {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error('Error al descifrar datos:', error);
      return null;
    }
  }
}
