import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  getUserProfile(userId: string) {
    // Implementar lógica para obtener el perfil del usuario
  }

  updateUserProfile(userId: string, profileData: any) {
    // Implementar lógica para actualizar el perfil del usuario
  }
}
